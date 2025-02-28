import { verifySchema } from '@/auth/schemas/v1/verify.schema'
import { ValidationService } from '@/app/services/validation.service'
import type { Request, Response } from 'express'
import { Token } from '@/app/models/token.model'
import { verify as jwtVerify } from '@/app/utils/jwt.util'
import { JwtSignType } from '@/app/types/jwt.type'
import { User } from '@/app/models/user.model'

export const verify = async (req: Request, res: Response) => {
  const body = await ValidationService.validateBodyRequest(
    req.body,
    verifySchema
  )

  const { token } = req.params
  const { signType, password } = body

  let message = ''

  const tokenFromDatabase = await Token.findOne({
    token,
    usedAt: null
  })
  if (!tokenFromDatabase)
    throw new Error('Token not found', {
      cause: {
        statusCode: 400
      }
    })

  const user = (await jwtVerify(token, signType)) as {
    id: string
  }

  const userFromDatabase = await User.findById(user.id)
  if (!userFromDatabase)
    throw new Error('User not found', {
      cause: {
        statusCode: 400
      }
    })

  tokenFromDatabase.usedAt = new Date()

  await tokenFromDatabase.save()

  if (signType === JwtSignType.VERIFY_USER) {
    userFromDatabase.isUserVerified = true
    await userFromDatabase.save()

    // Set message
    message = `Your account activation success`
  }

  if (signType === JwtSignType.FORGOT_PASSWORD) {
    // Check if theres any password pass in
    if (!password || password.length < 8)
      throw new Error('Password minimal length is 8', {
        cause: {
          statusCode: 422
        }
      })

    userFromDatabase.password = password
    await userFromDatabase.save()

    message = 'You successfully change your password'
  }

  res.status(200).json({
    message
  })
}
