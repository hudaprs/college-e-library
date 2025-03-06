import { getIsAuthenticated } from '@/app/redux/auth.redux.slice'
import { useSelector } from 'react-redux'
import { Navigate, Outlet, useLocation } from 'react-router-dom'
import {
  MenuUnfoldOutlined,
  MoonOutlined,
  SunOutlined
} from '@ant-design/icons'
import { Breadcrumb, Button, Drawer, Layout } from 'antd'
import { useTheme } from '@/app/providers/UIProvider/hook'
import { useEffect, useMemo, useState } from 'react'
import { SidebarContent } from './components/SidebarContent'

const { Header, Content } = Layout

export const AuthenticatedLayout = () => {
  const location = useLocation()
  const isAuthenticated = useSelector(getIsAuthenticated)
  const { isDarkMode, toggleTheme } = useTheme()
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768)
  const [sidebarOpen, setSidebarOpen] = useState(false) // Controls sidebar visibility on mobile
  const [isCollapsed, setIsCollapsed] = useState(false)

  // Auto-detect screen size and update state
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768)
      if (window.innerWidth >= 768) {
        setSidebarOpen(false) // Ensure sidebar is closed when resizing to desktop
      }
    }

    window.addEventListener('resize', handleResize)
    handleResize() // Initial check

    return () => window.removeEventListener('resize', handleResize)
  }, [])

  const breadcrumbItems = useMemo(
    () =>
      location.pathname
        .split('/')
        .filter(Boolean)
        .map((path, index, arr) => ({
          path: `/${arr.slice(0, index + 1).join('/')}`,
          title: path.charAt(0).toUpperCase() + path.slice(1) // Capitalize first letter
        })),
    [location.pathname]
  )

  if (!isAuthenticated) {
    return <Navigate to={'/auth/sign-in'} />
  }

  return (
    <div className={isDarkMode ? 'dark' : ''}>
      <Layout className='min-h-screen'>
        {/* Sidebar: Normal on Desktop, Hidden & Overlay on Mobile */}
        {!isMobile ? (
          <Layout.Sider
            collapsed={isCollapsed}
            onCollapse={setIsCollapsed}
            className='bg-gray-50 dark:bg-gray-800 flex flex-col'
            width={270}
          >
            <SidebarContent isCollapsed={isCollapsed} isMobile={isMobile} />
          </Layout.Sider>
        ) : (
          <Drawer
            placement='left'
            closable={false}
            onClose={() => setSidebarOpen(false)}
            open={sidebarOpen}
            width={270}
            className='bg-gray-50 dark:bg-gray-800'
            bodyStyle={{
              padding: 0
            }}
          >
            <SidebarContent isCollapsed={isCollapsed} isMobile={isMobile} />
          </Drawer>
        )}

        {/* Main Content Area */}
        <Layout>
          {/* Header */}
          <Header className='flex justify-between items-center bg-white dark:bg-gray-900 px-6'>
            <div className='flex items-center space-x-4'>
              {/* Sidebar Toggle Button for Mobile */}
              {isMobile && (
                <Button
                  type='text'
                  icon={<MenuUnfoldOutlined />}
                  onClick={() => setSidebarOpen(true)}
                  className='text-xl text-gray-600 dark:text-gray-300'
                />
              )}
              {/* Breadcrumb */}
              <Breadcrumb
                className='text-gray-600 dark:text-gray-300'
                items={breadcrumbItems}
              />
            </div>

            {/* Dark Mode Toggle */}
            <Button
              shape='circle'
              icon={isDarkMode ? <SunOutlined /> : <MoonOutlined />}
              onClick={toggleTheme}
            />
          </Header>

          {/* Content Area */}
          <Content className='p-6 bg-gray-100 dark:bg-gray-900'>
            <Outlet />
          </Content>
        </Layout>
      </Layout>
    </div>
  )
}
