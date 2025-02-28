import { Router } from 'express'
import { signUp } from '@/auth/routes/v1/sign-up.router'
import { verify } from '@/auth/routes/v1/verify.router'
import { signIn } from '@/auth/routes/v1/sign-in.router'
import { me } from '@/auth/routes/v1/me.router'
import { forgotPassword } from '@/auth/routes/v1/forgot-password.router'
import { refreshToken } from '@/auth/routes/v1/refresh-token.router'
import { changeActiveRole } from '@/auth/routes/v1/change-active-role.router'
import { ValidationService } from '@/app/services/validation.service'

const authRouterV1 = Router()

authRouterV1.get('/me', ValidationService.requireAuth, me)
authRouterV1.post('/sign-in', signIn)
authRouterV1.post('/sign-up', signUp)
authRouterV1.post('/refresh-token', refreshToken)
authRouterV1.post('/forgot-password', forgotPassword)
authRouterV1.patch('/verify/:token', verify)
authRouterV1.patch(
  '/change-active-role',
  ValidationService.requireAuth,
  changeActiveRole
)

export { authRouterV1 }
