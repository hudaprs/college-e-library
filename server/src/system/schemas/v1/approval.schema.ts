import type { SystemApprovalStatus } from '@/app/types/system.type'
import * as yup from 'yup'

export const approvalSchema = yup.object().shape({
  remark: yup.string().required(),
  status: yup.mixed<SystemApprovalStatus>().required()
})
