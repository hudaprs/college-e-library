import * as yup from 'yup'

export const changeActiveRoleSchema = yup.object().shape({
  roleId: yup.string().required()
})
