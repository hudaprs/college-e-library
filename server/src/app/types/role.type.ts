import type { PermissionCode, PermissionGroup } from './permission.type'

export type RolePermission = {
  code: PermissionCode
  group: PermissionGroup
}

export type Role = {
  id: string
  name: string
  permissions: RolePermission[]
  createdBy: string
  createdAt: string
  updatedAt: string
}
