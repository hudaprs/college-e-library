import type mongoose from 'mongoose'
import type { Role } from './role.type'

export type UserRole = {
  isActive: boolean
  role: mongoose.Types.ObjectId
}

export type User = {
  id: mongoose.Types.ObjectId
  name: string
  email: string
  password: string
  isUserVerified: boolean
  roles: UserRole[]
}

export interface UserPopulated extends User {
  roles: (UserRole & { role: Role })[]
}
