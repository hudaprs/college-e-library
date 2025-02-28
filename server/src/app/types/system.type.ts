import type mongoose from 'mongoose'

export enum SystemApprovalStatus {
  PENDING = 'Pending',
  PROCESS = 'Process',
  APPROVE = 'Approve',
  REJECT = 'Reject'
}

export type SystemApprovalHistory = {
  remark: string
  status: SystemApprovalStatus
  processedBy: mongoose.Types.ObjectId
  createdAt: string
}

export type System = {
  id: mongoose.Types.ObjectId
  name: string
  address: string
  phoneNumber: string
  requestedBy: mongoose.Types.ObjectId
  status: SystemApprovalStatus
  approvalHistories: SystemApprovalHistory[]
  staffs: mongoose.Types.ObjectId[]
}
