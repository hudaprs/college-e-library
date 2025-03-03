import { generateOtp } from '@/app/utils/common.util'
import type { JwtDecode } from '@/app/types/jwt.type'
import { JwtSignType } from '@/app/types/jwt.type'
import { decode, generateToken } from '@/app/utils/jwt.util'
import { nodeMailerWrapper } from './nodemailer-wrapper.service'
import { NodemailerService } from './nodemailer.service'
import type { UserDocument } from '@/app/models/user.model'
import { Token } from '@/app/models/token.model'

export class MailService {
  public static async generateEmailWithVerificationCode(
    signType: JwtSignType,
    user: UserDocument,
    options?: { isMobile?: boolean }
  ) {
    let subject = `E-Library - `
    let html: string
    let mappedToken: string
    const isMobile = options?.isMobile
    let payload: JwtDecode = { id: user.id, otp: '', isMobile: false }

    // Check if coming from mobile
    // Generate extra payload
    if (isMobile) {
      payload = {
        ...payload,
        otp: generateOtp(),
        isMobile
      }
    }

    // Generate jwt token according sign type
    const token = generateToken(payload, signType)

    // Check if coming from mobile
    // Decode the token
    if (isMobile) {
      mappedToken = decode(token).otp as string
    } else {
      mappedToken = token
    }

    switch (signType) {
      case JwtSignType.VERIFY_USER:
        subject = `${subject} Verify Account ${user.name}`
        html = `Please visit to verify your in this link: <a href="${process.env.CLIENT_VERIFY_URL}/${mappedToken}">Verify Account</a>`
        break
      case JwtSignType.FORGOT_PASSWORD:
        subject = `${subject} Forgot Password ${user.name}`
        html = `Your forgot password ${
          isMobile ? 'otp' : 'token'
        } is: ${mappedToken}`
        break
      default:
        subject = `${subject} - IGNORE THIS EMAIL!`
        html = `Ignore this email, this is just a test!`
    }

    // Send mail to specific user
    await new NodemailerService(nodeMailerWrapper.transporter).sendMail({
      to: user.email,
      subject,
      html
    })

    const tokenFromDatabase = await Token.find({
      type: signType,
      userId: user.id,
      usedAt: null
    })

    if (tokenFromDatabase.length > 0)
      await Token.deleteMany({
        id: { $in: tokenFromDatabase.map(token => token.id) }
      })

    return Token.build({
      token,
      type: signType,
      userId: user.id
    }).save()
  }
}
