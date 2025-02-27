import { JwtSignType } from '@/app/types/jwt.type'
import * as yup from 'yup'

export const verifySchema = yup.object().shape({
  signType: yup
    .mixed<JwtSignType>()
    .oneOf(Object.values(JwtSignType), 'Invalid Sign Type')
    .required('Sign Type is required'),
  password: yup.string().optional()
})
