import * as yup from 'yup'

export const syncStaffSchema = yup.object().shape({
  userIds: yup.array(yup.string().required()).min(1).required()
})
