import type {
  BaseQueryFn,
  FetchArgs,
  FetchBaseQueryError
} from '@reduxjs/toolkit/query/react'
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { Mutex } from 'async-mutex'
import type { AuthRefreshTokenResponse } from '@/app/types/auth.type'
import { AUTH_CLEAR, AUTH_SET_TOKEN } from './auth.redux.slice'
import type { RootState } from './'

const baseQuery = fetchBaseQuery({
  baseUrl: import.meta.env.VITE_BASE_URL,
  prepareHeaders: (headers, { getState }) => {
    const token = (getState() as RootState).auth.tokens.token

    // If we have a token set in state, let's assume that we should be passing it.
    if (token) {
      headers.set('Authorization', `Bearer ${token}`)
    }

    return headers
  }
})
const mutex = new Mutex()
const baseQueryWithReauth: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  // wait until the mutex is available without locking it
  await mutex.waitForUnlock()
  let result = await baseQuery(args, api, extraOptions)
  if (result.error && result.error.status === 401) {
    // checking whether the mutex is locked
    if (!mutex.isLocked()) {
      const release = await mutex.acquire()
      try {
        const refreshToken = (api.getState() as RootState).auth.tokens
          .refreshToken

        const refreshResult = (await baseQuery(
          {
            url: '/v1/auth/refresh-token',
            method: 'POST',
            body: {
              refreshToken
            }
          },
          api,
          extraOptions
        )) as { data: AuthRefreshTokenResponse }

        if (refreshResult.data) {
          api.dispatch(AUTH_SET_TOKEN(refreshResult.data.results))

          // retry the initial query
          result = await baseQuery(args, api, extraOptions)
        } else {
          api.dispatch(AUTH_CLEAR())
        }
      } finally {
        // release must be called once the mutex should be released again.
        release()
      }
    } else {
      // wait until the mutex is available without locking it
      await mutex.waitForUnlock()
      result = await baseQuery(args, api, extraOptions)
    }
  }
  return result
}

export const emptySplitApi = createApi({
  baseQuery: baseQueryWithReauth,
  endpoints: () => ({})
})
