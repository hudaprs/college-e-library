import mongoose from 'mongoose'
import {
  type Permission,
  PermissionCode,
  PermissionGroup
} from '../types/permission.type'
import type { RolePermission, Role as TRole } from '../types/role.type'

export interface RoleBuildAttrs {
  name: string
  permissions: RolePermission[]
}

export type RoleDocument = mongoose.Document & TRole

interface RoleModel extends mongoose.Model<RoleDocument> {
  build: (attrs: RoleBuildAttrs) => RoleDocument
}

const roleSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true
    },
    permissions: [
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
      }
    ]
  },
  {
    toJSON: {
      transform: (doc, ret) => {
        ret.id = doc._id
        ret.permissions = ret.permissions.map((permission: Permission) => ({
          code: permission.code,
          group: permission.group
        }))
        delete ret._id
        delete ret.__v
      }
    },
    timestamps: true
  }
)

roleSchema.index({
  name: 'text'
})

roleSchema.statics.build = (attrs: RoleBuildAttrs) => {
  return new Role(attrs)
}

const Role = mongoose.model<RoleDocument, RoleModel>('Role', roleSchema)

export { Role }
