import type { Request, Response } from 'express'
import { generateToken, verify } from '@/app/utils/jwt.util'
import { JwtSignType } from '@/app/types/jwt.type'
import { User } from '@/app/models/user.model'
import { ValidationService } from '@/app/services/validation.service'
import { refreshTokenSchema } from '@/app/schemas/v1/auth/refresh-token.schema'

export const refreshToken = async (req: Request, res: Response) => {
  const { refreshToken } = await ValidationService.validateBodyRequest(
    req.body,
    refreshTokenSchema
  )

  const userFromToken = await verify<typeof req.currentUser>(
    refreshToken,
    JwtSignType.REFRESH_TOKEN
  )

  if (!userFromToken)
    throw new Error('Token Invalid', {
      cause: {
        statusCode: 401
      }
    })

  const user = await User.findById(userFromToken.id)

  if (!user)
    throw new Error('Account not found', {
      cause: {
        statusCode: 401
      }
    })

  const jwtPayload = { id: user.id }
  const token = generateToken(jwtPayload, JwtSignType.LOGIN)
  const newRefreshToken = generateToken(jwtPayload, JwtSignType.REFRESH_TOKEN)

  res.status(200).json({
    message: 'Token successfully refreshed',
    results: {
      token,
      refreshToken: newRefreshToken
    }
  })
}
