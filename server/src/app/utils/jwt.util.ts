import jwt from 'jsonwebtoken'
import type { JwtDecode } from '@/app/types/jwt.type'
import { JwtSignType } from '@/app/types/jwt.type'

export const generateJwtSignKey = (signType: JwtSignType) => {
  switch (signType) {
    case JwtSignType.LOGIN:
      return {
        jwtSignKey: process.env.JWT_SECRET,
        expiresIn: '30d' as jwt.SignOptions['expiresIn']
      }
    case JwtSignType.REFRESH_TOKEN:
      return {
        jwtSignKey: process.env.JWT_REFRESH_SECRET,
        expiresIn: '30d' as jwt.SignOptions['expiresIn']
      }
    case JwtSignType.VERIFY_USER:
      return {
        jwtSignKey: process.env.JWT_VERIFY_USER_SECRET,
        expiresIn: '10m' as jwt.SignOptions['expiresIn']
      }
    case JwtSignType.FORGOT_PASSWORD:
      return {
        jwtSignKey: process.env.JWT_VERIFY_FORGOT_PASSWORD_SECRET,
        expiresIn: '10m' as jwt.SignOptions['expiresIn']
      }
    default:
      return {
        jwtSignKey: signType,
        expiresIn: '5m' as jwt.SignOptions['expiresIn']
      }
  }
}

export const generateToken = (
  payload: { id: string },
  signType: JwtSignType,
  config?: jwt.SignOptions
): string => {
  return jwt.sign(payload, generateJwtSignKey(signType).jwtSignKey, {
    ...config,
    expiresIn: config?.expiresIn || generateJwtSignKey(signType).expiresIn
  })
}

export const decode = (token: string) => {
  return jwt.decode(token) as JwtDecode
}

export const verify = <T>(token: string, signType: JwtSignType) => {
  return jwt.verify(token, generateJwtSignKey(signType).jwtSignKey) as T
}
