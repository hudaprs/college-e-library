import mongoose from 'mongoose'
import {
  type SystemApprovalHistory,
  SystemApprovalStatus,
  type System as TSystem
} from '../types/system.type'
import type { User } from '../types/user.type'

export interface SystemBuildAttrs {
  name: string
  address: string
  phoneNumber: string
  requestedBy: mongoose.Types.ObjectId
  approvalHistories?: SystemApprovalHistory[]
  staffs?: mongoose.Types.ObjectId[]
  status?: SystemApprovalStatus
}

export type SystemDocument = mongoose.Document & TSystem

export type SystemDocumentPopulated = SystemDocument & {
  staffs: User[]
  requestedBy: User
  approvalHistories: (SystemApprovalHistory & { processedBy: User })[]
}

interface SystemModel extends mongoose.Model<SystemDocument> {
  build: (attrs: SystemBuildAttrs) => SystemDocument
}

const systemSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true
    },
    address: {
      type: String,
      required: true
    },
    phoneNumber: {
      type: String,
      required: true
    },
    status: {
      type: String,
      enum: Object.values(SystemApprovalStatus),
      required: true,
      default: SystemApprovalStatus.PENDING
    },
    requestedBy: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User'
    },
    approvalHistories: [
      {
        remark: {
          type: String,
          required: true
        },
        status: {
          type: String,
          enum: Object.values(SystemApprovalStatus),
          required: true
        },
        processedBy: {
          type: mongoose.Schema.Types.ObjectId,
          required: true,
          ref: 'User'
        },
        createdAt: {
          type: Date,
          default: Date.now
        }
      }
    ],
    staffs: [
      { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'User' }
    ]
  },
  {
    toJSON: {
      transform: (doc, ret) => {
        ret.id = doc._id
        delete ret._id
        delete ret.__v
      }
    },
    timestamps: true
  }
)

systemSchema.index({
  name: 'text',
  address: 'text',
  phoneNumber: 'text'
})

systemSchema.statics.build = (attrs: SystemBuildAttrs) => {
  return new System(attrs)
}

const System = mongoose.model<SystemDocument, SystemModel>(
  'System',
  systemSchema
)

export { System }
