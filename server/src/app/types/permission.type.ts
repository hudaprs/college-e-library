export enum PermissionCode {
  VIEW_USER = 'view:user',
  CREATE_USER = 'create:user',
  UPDATE_USER = 'update:user',
  DELETE_USER = 'delete:user',
  VIEW_PERMISSION = 'view:permission',
  VIEW_ROLE = 'view:role',
  CREATE_ROLE = 'create:role',
  UPDATE_ROLE = 'update:role',
  DELETE_ROLE = 'delete:role',
  VIEW_SYSTEM = 'view:system',
  CREATE_SYSTEM = 'create:system',
  UPDATE_SYSTEM = 'update:system',
  DELETE_SYSTEM = 'delete:system',
  ADMIN_SYSTEM = 'all:system:admin',
  VIEW_SYSTEM_STAFF = 'view:system:staff',
  CREATE_SYSTEM_STAFF = 'create:system:staff',
  UPDATE_SYSTEM_STAFF = 'update:system:staff',
  DELETE_SYSTEM_STAFF = 'delete:system:staff'
}

export enum PermissionGroup {
  USER = 'user',
  PERMISSION = 'permission',
  ROLE = 'role',
  SYSTEM = 'system'
}

export type Permission = {
  id: string
  code: PermissionCode
  group: PermissionGroup
  createdAt: string
  updatedAt: string
}
