export type UserRole = {
  isActive: boolean
  role: string
}

export type User = {
  id: string
  name: string
  email: string
  password: string
  isUserVerified: boolean
  roles: UserRole[]
}
