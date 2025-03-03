import type {
  AuthChangeActiveRoleForm,
  AuthChangeActiveRoleResponse,
  AuthForgotPasswordForm,
  AuthForgotPasswordResponse,
  AuthMeResponse,
  AuthRefreshTokenForm,
  AuthRefreshTokenResponse,
  AuthSignInForm,
  AuthSignInResponse,
  AuthSignUpForm,
  AuthSignUpResponse,
  AuthVerifyForm,
  AuthVerifyResponse
} from '@/app/types/auth.type'
import { emptySplitApi } from './empty.redux.rtk'

export const authApi = emptySplitApi.injectEndpoints({
  endpoints: builder => ({
    authSignUp: builder.mutation<AuthSignUpResponse, AuthSignUpForm>({
      query: body => ({
        url: '/v1/auth/sign-up',
        method: 'POST',
        body
      })
    }),
    authSignIn: builder.mutation<AuthSignInResponse, AuthSignInForm>({
      query: body => ({
        url: '/v1/auth/sign-in',
        method: 'POST',
        body
      })
    }),
    authRefreshToken: builder.mutation<
      AuthRefreshTokenResponse,
      AuthRefreshTokenForm
    >({
      query: body => ({
        url: '/v1/auth/refresh-token',
        method: 'POST',
        body
      })
    }),
    authForgotPassword: builder.mutation<
      AuthForgotPasswordResponse,
      AuthForgotPasswordForm
    >({
      query: body => ({
        url: '/v1/auth/forgot-password',
        method: 'POST',
        body
      })
    }),
    authVerify: builder.mutation<AuthVerifyResponse, AuthVerifyForm>({
      query: ({ token, ...rest }) => ({
        url: `/v1/auth/verify/${token}`,
        method: 'PATCH',
        body: rest
      })
    }),
    authChangeActive: builder.mutation<
      AuthChangeActiveRoleResponse,
      AuthChangeActiveRoleForm
    >({
      query: body => ({
        url: `/v1/auth/change-active-role`,
        method: 'PATCH',
        body
      })
    }),
    authMe: builder.query<AuthMeResponse, void>({
      query: () => ({
        url: `/v1/auth/me`
      })
    })
  }),
  overrideExisting: false
})

export const {
  useAuthSignUpMutation,
  useAuthSignInMutation,
  useAuthRefreshTokenMutation,
  useAuthForgotPasswordMutation,
  useAuthVerifyMutation,
  useAuthChangeActiveMutation,
  useLazyAuthMeQuery
} = authApi
