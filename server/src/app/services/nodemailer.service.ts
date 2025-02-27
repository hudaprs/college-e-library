import { logger } from '@/app/utils/logger.util'
import type { SendMailOptions, Transporter } from 'nodemailer'

export class NodemailerService {
  private filename = 'nodemailer.service.ts'
  transporter: Transporter

  constructor(transporter: Transporter) {
    this.transporter = transporter
  }

  renderMail = (mailOptions: SendMailOptions) => {
    return {
      from: process.env.SMTP_TO_EMAIL || mailOptions?.from,
      ...mailOptions
    }
  }

  sendMail = (mailOptions: SendMailOptions) => {
    return new Promise((resolve, reject) => {
      this.transporter.sendMail(
        {
          from: process.env.SMTP_TO_EMAIL || mailOptions?.from,
          ...mailOptions
        },
        (err, success) => {
          if (err) {
            logger.error(
              `${this.filename}: App Nodemailer Service: Something went wrong when sending email ${err.message}`
            )
            reject(err)
          } else {
            logger.info(
              `${this.filename}: App Nodemailer Service: Successfully send email!`
            )
            resolve(success)
          }
        }
      )
    })
  }
}
