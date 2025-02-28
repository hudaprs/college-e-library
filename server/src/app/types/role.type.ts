import type { Permission } from './permission.type'

export type Role = {
  id: string
  name: string
  permissions: Permission[]
  createdBy: string
  createdAt: string
  updatedAt: string
}
