import * as yup from 'yup'

export const storeSchema = yup.object().shape({
  name: yup.string().required(),
  address: yup.string().required(),
  phoneNumber: yup.string().required()
})
