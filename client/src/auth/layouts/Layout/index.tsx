import { Outlet } from 'react-router-dom'

export const Layout = () => {
  return (
    <div className='bg-gray-50 dark:bg-gray-900 flex items-center justify-center min-h-screen'>
      <Outlet />
    </div>
  )
}
