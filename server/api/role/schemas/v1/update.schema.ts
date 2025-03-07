import * as yup from 'yup'

export const updateSchema = yup.object().shape({
  name: yup.string().required(),
  permissions: yup
    .array(
      yup.object().shape({
        code: yup.string().required(),
        group: yup.string().required()
      })
    )
    .min(1)
    .required()
})
