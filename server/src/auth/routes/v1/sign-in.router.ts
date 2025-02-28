import { ValidationService } from '@/app/services/validation.service'
import type { Request, Response } from 'express'
import { User } from '@/app/models/user.model'
import { MailService } from '@/app/services/mail.service'
import { JwtSignType } from '@/app/types/jwt.type'
import { signInSchema } from '@/auth/schemas/v1/sign-in.schema'
import bcrypt from 'bcryptjs'
import { generateToken } from '@/app/utils/jwt.util'

export const signIn = async (req: Request, res: Response) => {
  const body = await ValidationService.validateBodyRequest(
    req.body,
    signInSchema
  )

  const user = await User.findOne({
    email: body.email.replace(/\s+/, '').trim().toLowerCase()
  })
  if (!user)
    throw new Error('Invalid credentials', {
      cause: {
        statusCode: 400
      }
    })

  const isPasswordCorrect = await bcrypt.compare(body.password, user.password)
  if (!isPasswordCorrect)
    throw new Error('Invalid credentials', {
      cause: {
        statusCode: 400
      }
    })

  if (!user.isUserVerified) {
    await MailService.generateEmailWithVerificationCode(
      JwtSignType.VERIFY_USER,
      user
    )
  }

  const jwtPayload = { id: user.id }
  const token = generateToken(jwtPayload, JwtSignType.LOGIN)
  const refreshToken = generateToken(jwtPayload, JwtSignType.REFRESH_TOKEN)

  req.currentUser = {
    id: user.id
  }

  res.status(200).json({
    message: 'Login successfully',
    results: {
      token,
      refreshToken
    }
  })
}
