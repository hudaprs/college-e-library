import * as yup from 'yup'

export const updateSchema = yup.object().shape({
  name: yup.string().required(),
  email: yup.string().email().required(),
  password: yup.string().optional(),
  roles: yup.array(yup.string()).min(1).required()
})
