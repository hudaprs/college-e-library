import type { ApiResponse } from './api.type'
import type { JwtSignType } from './jwt.type'
import type { User } from './user.type'

export type AuthStateToken = {
  token: string
  refreshToken: string
}

export type AuthStateAuthenticatedUser = User

export type AuthState = {
  tokens: AuthStateToken
  authenticatedUser: AuthStateAuthenticatedUser | null
}

export type AuthSignUpForm = {
  name: string
  email: string
  password: string
}

export type AuthSignInForm = {
  email: string
  password: string
}

export type AuthForgotPasswordForm = {
  email: string
}

export type AuthRefreshTokenForm = {
  refreshToken: string
}

export type AuthVerifyForm = {
  token: string
  signType: JwtSignType
  password?: string
}

export type AuthChangeActiveRoleForm = {
  roleId: string
}

export type AuthSignUpResponse = ApiResponse<User>
export type AuthSignInResponse = ApiResponse<AuthStateToken>
export type AuthRefreshTokenResponse = ApiResponse<AuthStateToken>
export type AuthForgotPasswordResponse = ApiResponse<null>
export type AuthVerifyResponse = ApiResponse<null>
export type AuthMeResponse = ApiResponse<User>
export type AuthChangeActiveRoleResponse = ApiResponse<User>
