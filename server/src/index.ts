import { server } from './server'
import { logger } from '@/app/utils/logger.util'
import { nodeMailerWrapper } from '@/app/services/nodemailer-wrapper.service'
import { DatabaseService } from '@/app/services/database.service'

const start = async () => {
  if (!process.env.PORT) throw new Error('PORT must be defined')
  if (!process.env.JWT_SECRET) throw new Error('JWT_SECRET must be defined')
  if (!process.env.JWT_REFRESH_SECRET)
    throw new Error('JWT_REFRESH_SECRET must be defined')
  if (!process.env.JWT_VERIFY_USER_SECRET)
    throw new Error('JWT_VERIFY_USER_SECRET must be defined')
  if (!process.env.JWT_VERIFY_FORGOT_PASSWORD_SECRET)
    throw new Error('JWT_VERIFY_FORGOT_PASSWORD_SECRET must be defined')
  if (!process.env.SMTP_TO_EMAIL)
    throw new Error('SMTP_TO_EMAIL must be defined')
  if (!process.env.SMTP_TO_PASSWORD)
    throw new Error('SMTP_TO_PASSWORD must be defined')
  if (!process.env.DB_URI) throw new Error('DB_URI must be defined')

  try {
    await DatabaseService.connect()
    await nodeMailerWrapper.connect()

    server.listen(process.env.PORT, () => {
      logger.info(`Listening on port ${process.env.PORT}`)
    })
  } catch (err) {
    logger.error(err)
  }
}

start()
