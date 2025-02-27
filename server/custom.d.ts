import type { JwtPayload } from 'jsonwebtoken'

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      PORT: string
      JWT_SECRET: string
      JWT_REFRESH_SECRET: string
      JWT_VERIFY_USER_SECRET: string
      JWT_VERIFY_FORGOT_PASSWORD_SECRET: string
      SMTP_TO_EMAIL: string
      SMTP_TO_PASSWORD: string
      DB_HOST: string
    }
  }
}

declare global {
  namespace Express {
    interface Request {
      currentUser?: JwtPayload & { id: string }
    }
  }
}

export {}
