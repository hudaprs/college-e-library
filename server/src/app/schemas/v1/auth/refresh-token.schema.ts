import * as yup from 'yup'

export const refreshTokenSchema = yup.object().shape({
  refreshToken: yup.string().required()
})
