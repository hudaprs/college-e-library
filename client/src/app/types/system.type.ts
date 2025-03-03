export enum SystemApprovalStatus {
  PENDING = 'Pending',
  PROCESS = 'Process',
  APPROVE = 'Approve',
  REJECT = 'Reject'
}

export type SystemApprovalHistory = {
  remark: string
  status: SystemApprovalStatus
  processedBy: string
  createdAt: string
}

export type System = {
  id: string
  name: string
  address: string
  phoneNumber: string
  requestedBy: string
  status: SystemApprovalStatus
  approvalHistories: SystemApprovalHistory[]
  staffs: string[]
}
