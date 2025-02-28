export type Permission = {
  id: string
  code: string
  group: string
  createdAt: string
  updatedAt: string
}

export enum PermissionCode {
  VIEW_USER = 'view:user',
  CREATE_USER = 'create:user',
  UPDATE_USER = 'update:user',
  DELETE_USER = 'delete:user',
  VIEW_PERMISSION = 'view:permission',
  VIEW_ROLE = 'view:role',
  CREATE_ROLE = 'create:role',
  UPDATE_ROLE = 'update:role',
  DELETE_ROLE = 'delete:role'
}

export enum PermissionGroup {
  USER = 'user',
  PERMISSION = 'permission',
  ROLE = 'role'
}
