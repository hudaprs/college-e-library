import { getIsAuthenticated } from '@/app/redux/auth.redux.slice'
import { useSelector } from 'react-redux'
import { Navigate, Outlet } from 'react-router-dom'

export const Layout = () => {
  const isAuthenticated = useSelector(getIsAuthenticated)

  if (isAuthenticated) {
    return <Navigate to={'/dashboard'} />
  }

  return (
    <div className='bg-gray-50 dark:bg-gray-900 flex items-center justify-center min-h-screen'>
      <Outlet />
    </div>
  )
}
