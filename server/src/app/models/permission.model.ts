import mongoose from 'mongoose'
import { PermissionGroup } from '@/app/types/permission.type'
import { PermissionCode } from '@/app/types/permission.type'

interface PermissionBuildAttrs {
  code: PermissionCode
  group: PermissionGroup
}

export interface PermissionDocument extends mongoose.Document {
  code: PermissionCode
  group: PermissionGroup
}

interface PermissionModel extends mongoose.Model<PermissionDocument> {
  build: (attrs: PermissionBuildAttrs) => PermissionDocument
}

const permissionSchema = new mongoose.Schema(
  {
    code: {
      type: String,
      enum: Object.values(PermissionCode),
      required: true
    },
    group: {
      type: String,
      enum: Object.values(PermissionGroup),
      required: true
    }
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

permissionSchema.index({
  name: 'text',
  group: 'text'
})

permissionSchema.statics.build = (attrs: PermissionBuildAttrs) => {
  return new Permission(attrs)
}

const Permission = mongoose.model<PermissionDocument, PermissionModel>(
  'Permission',
  permissionSchema
)

export { Permission }
