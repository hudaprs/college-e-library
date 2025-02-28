import mongoose from 'mongoose'
import type { Permission } from '@/app/types/permission.type'
import type { Role as TRole } from '@/app/types/role.type'

interface RoleBuildAttrs {
  name: string
  createdBy: string
  permissions: Partial<Permission>[]
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
          required: true
        },
        group: {
          type: String,
          required: true
        }
      }
    ],
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User'
    }
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
