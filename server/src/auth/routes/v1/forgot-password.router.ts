import type { Request, Response } from 'express'
import { JwtSignType } from '@/app/types/jwt.type'
import { User } from '@/app/models/user.model'
import { ValidationService } from '@/app/services/validation.service'
import { forgotPasswordSchema } from '@/app/schemas/v1/auth/forgot-password.schema'
import { MailService } from '@/app/services/mail.service'

export const forgotPassword = async (req: Request, res: Response) => {
  let { email } = await ValidationService.validateBodyRequest(
    req.body,
    forgotPasswordSchema
  )

  email = email.replace(/\s+/, '').trim().toLowerCase()

  const user = await User.findOne({ email })
  if (!user)
    throw new Error('Invalid credentials', {
      cause: {
        statusCode: 400
      }
    })

  await MailService.generateEmailWithVerificationCode(
    JwtSignType.FORGOT_PASSWORD,
    user
  )

  res.status(200).json({
    message: 'Forgot password token successfully sent to your email'
  })
}
