import type { Transporter } from 'nodemailer'
import nodemailer from 'nodemailer'
import { logger } from '@/app/utils/logger.util'

export class NodeMailerWrapper {
  private _transporter?: Transporter
  private transport = {
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
      user: process.env.SMTP_TO_EMAIL,
      pass: process.env.SMTP_TO_PASSWORD
    }
  }
  private filename = 'nodemailer-wrapper.service.ts'

  constructor(transporter?: Transporter) {
    this._transporter = transporter
  }

  get transporter() {
    if (!this._transporter)
      throw new Error(
        `${this.filename}: App Nodemailer Wrapper Service: nodemailer not successfully initiated!`
      )

    return this._transporter
  }

  connect(): Promise<void> {
    this._transporter = nodemailer.createTransport(this.transport)

    return new Promise((resolve, reject) => {
      this.transporter.verify(error => {
        if (error) {
          logger.error(`${this.filename}: ${error}`)
          reject(error)
        } else {
          logger.info(`${this.filename}: Ready to send mail!`)
          resolve()
        }
      })
    })
  }
}

const nodeMailerWrapper = new NodeMailerWrapper()

export { nodeMailerWrapper }
