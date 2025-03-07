import type mongoose from 'mongoose'
import type { PermissionCode, PermissionGroup } from './permission.type'

export type RolePermission = {
  code: PermissionCode
  group: PermissionGroup
}

export type Role = {
  id: mongoose.Types.ObjectId
  name: string
  permissions: RolePermission[]
  createdAt: string
  updatedAt: string
}
