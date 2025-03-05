import type { PayloadAction } from '@reduxjs/toolkit'
import { createSlice } from '@reduxjs/toolkit'
import type {
  AuthState,
  AuthStateAuthenticatedUser,
  AuthStateToken
} from '@/app/types/auth.type'
import type { RootState } from '.'

const initialState: AuthState = {
  tokens: {
    token: '',
    refreshToken: ''
  },
  authenticatedUser: null
}

export const authSlice = createSlice({
  initialState,
  name: 'authSlice',
  reducers: {
    AUTH_SET_TOKEN: (
      state,
      { payload }: PayloadAction<AuthStateToken>
    ): void => {
      state.tokens = payload
    },
    AUTH_SET_AUTHENTICATED_USER: (
      state,
      { payload }: PayloadAction<AuthStateAuthenticatedUser>
    ): void => {
      state.authenticatedUser = payload
    },
    AUTH_CLEAR: (state): void => {
      state.tokens = {
        refreshToken: '',
        token: ''
      }
      state.authenticatedUser = null
    }
  }
})

export const { AUTH_SET_TOKEN, AUTH_SET_AUTHENTICATED_USER, AUTH_CLEAR } =
  authSlice.actions

export const getIsAuthenticated = (state: RootState) =>
  !!state.auth.tokens.token

export default authSlice.reducer
