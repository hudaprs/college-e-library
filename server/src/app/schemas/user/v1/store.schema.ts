import * as yup from 'yup'

export const storeSchema = yup.object().shape({
  name: yup.string().required(),
  email: yup.string().email().required(),
  password: yup.string().min(8).required(),
  roles: yup.array(yup.string().required()).min(1).required()
})
