import bcrypt from 'bcryptjs'

export const hashPassword = async (password: string) => {
  // Hash password
  const salt = await bcrypt.genSalt(10)
  const hashedPassword = await bcrypt.hash(password, salt)

  return hashedPassword
}

export const generateOtp = () => {
  // Declare a digits variable
  // which stores all digits
  const digits = '0123456789'

  let OTP = ''

  for (let i = 0; i < 6; i++) {
    OTP += digits[Math.floor(Math.random() * 10)]
  }

  return OTP
}
