import * as yup from 'yup'
import type { NextFunction, Request, Response } from 'express'
import { JsonWebTokenError, TokenExpiredError } from 'jsonwebtoken'
import { User } from '@/app/models/user.model'
import { verify } from '@/app/utils/jwt.util'
import type { JwtDecode } from '@/app/types/jwt.type'
import { JwtSignType } from '@/app/types/jwt.type'

type CauseError = {
  statusCode?: number
  stackTrace?: unknown
}

export class ValidationService {
  public static handleError(
    err: Error,
    req: Request,
    res: Response,
    // eslint-disable-next-line
    next: NextFunction
  ) {
    // Handle validation error
    if (err instanceof yup.ValidationError) {
      const errors = err.inner.map(error => ({
        message: error.message,
        field: error.path || ''
      }))

      res.status(422).json({
        message: 'Invalid data input',
        errors
      })

      return
    }

    // Handle cause / custom (status code) identifier error
    if (err instanceof Error) {
      const cause = err?.cause as CauseError
      if (cause && cause?.statusCode) {
        res.status(cause.statusCode).json({
          message: err.message,
          stackTrace: cause?.stackTrace || err?.stack
        })

        return
      }
    }

    if (err.name === 'CastError' && err.message.includes('ObjectId')) {
      res.status(400).json({
        message: 'Invalid ID',
        errors: [
          {
            message: err.message
          }
        ]
      })
    }

    res.status(500).json({
      message: 'Something went wrong in the server',
      errors: [
        {
          message: err instanceof Error ? err.message : 'Internal Server Error'
        }
      ],
      stackTrace: err instanceof Error ? err?.stack : null
    })
  }

  public static async validateBodyRequest<T = unknown>(
    body: unknown,
    schema: yup.Schema<T>
  ): Promise<T> {
    await schema.validate(body, { abortEarly: false })

    return body as T
  }

  public static async requireAuth(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    const authorizationHeader = req.header('Authorization')
    const splitAuthorizationHeader = authorizationHeader?.split(' ')
    const bearer = splitAuthorizationHeader?.[0]
    const token = splitAuthorizationHeader?.[1]

    if (bearer !== 'Bearer') {
      throw new Error('Token is invalid', {
        cause: {
          statusCode: 400
        }
      })
    }

    if (!token) {
      throw new Error('Token is required', {
        cause: {
          statusCode: 400
        }
      })
    }

    try {
      const user = verify<JwtDecode>(token, JwtSignType.LOGIN)

      if (user?.id) {
        const existedUser = await User.findById(user.id)
        if (!existedUser)
          throw new Error('Unauthorized', {
            cause: {
              statusCode: 401
            }
          })
        req.currentUser = user
      }
    } catch (err) {
      // Handle JWT Error Expired
      if (err instanceof TokenExpiredError) {
        throw new Error('Authentication Error', {
          cause: {
            statusCode: 401
          }
        })
      }

      // Handle JWT Common Error
      if (err instanceof JsonWebTokenError) {
        throw new Error('Authentication Error', {
          cause: {
            statusCode: 401
          }
        })
      }

      throw new Error(
        err instanceof Error
          ? err.message
          : 'Something went inside verifying authenticated user',
        {
          cause: {
            statusCode: 500
          }
        }
      )
    }

    next()
  }
}
