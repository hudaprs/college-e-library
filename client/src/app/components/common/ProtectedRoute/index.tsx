import { Navigate, Outlet } from 'react-router-dom'
import type { ProtectedRouteProps } from './types'

export const ProtectedRoute = ({ isAuthenticated }: ProtectedRouteProps) => {
  return isAuthenticated ? <Outlet /> : <Navigate to={'/auth/sign-in'} />
}
