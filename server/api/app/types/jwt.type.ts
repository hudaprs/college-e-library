import type mongoose from 'mongoose'

export enum JwtSignType {
  LOGIN = 'Login',
  REFRESH_TOKEN = 'RefreshToken',
  FORGOT_PASSWORD = 'ForgotPassword',
  VERIFY_USER = 'VerifyUser'
}

export type JwtDecode = {
  id: mongoose.Types.ObjectId
  otp?: string
  isMobile?: boolean
}
