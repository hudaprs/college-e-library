import { ValidationService } from '@/app/services/validation.service'
import type { Request, Response } from 'express'
import { signUpSchema } from '@/auth/schemas/v1/sign-up.schema'
import { User } from '@/app/models/user.model'
import { MailService } from '@/app/services/mail.service'
import { JwtSignType } from '@/app/types/jwt.type'

export const signUp = async (req: Request, res: Response) => {
  const body = await ValidationService.validateBodyRequest(
    req.body,
    signUpSchema
  )

  const email = body.email.replace(/\s+/, '').trim().toLowerCase()

  const existedUser = await User.findOne({
    email
  })
  if (existedUser)
    throw new Error('Email currently in used', {
      cause: {
        statusCode: 400
      }
    })

  const user = await User.build({
    ...body,
    email
  }).save()

  await MailService.generateEmailWithVerificationCode(
    JwtSignType.VERIFY_USER,
    user
  )

  res.status(201).json({
    message:
      'You successfully registered, please check email to verify your account',
    results: user
  })
}
