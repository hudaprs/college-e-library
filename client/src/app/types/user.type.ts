import type { Role } from './role.type'

export type UserRole = {
  isActive: boolean
  role: Role
}

export type User = {
  id: string
  name: string
  email: string
  password: string
  isUserVerified: boolean
  roles: UserRole[]
}
