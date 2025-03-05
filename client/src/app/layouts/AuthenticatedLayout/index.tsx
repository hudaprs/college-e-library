import { AUTH_CLEAR, getIsAuthenticated } from '@/app/redux/auth.redux.slice'
import { useSelector } from 'react-redux'
import { Navigate, Outlet } from 'react-router-dom'
import {
  AppstoreOutlined,
  BulbOutlined,
  FileOutlined,
  FileTextOutlined,
  HomeOutlined,
  LogoutOutlined,
  MenuUnfoldOutlined,
  SettingOutlined,
  TeamOutlined,
  UserOutlined
} from '@ant-design/icons'
import {
  Avatar,
  Breadcrumb,
  Button,
  Drawer,
  Dropdown,
  Layout,
  Menu,
  Switch
} from 'antd'
import { useTheme } from '@/app/providers/UIProvider/hook'
import { useEffect, useState } from 'react'
import { useAppDispatch } from '@/app/redux'

const { Header, Content } = Layout

export const AuthenticatedLayout = () => {
  const isAuthenticated = useSelector(getIsAuthenticated)
  const { isDarkMode, toggleTheme } = useTheme()
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768)
  const [sidebarOpen, setSidebarOpen] = useState(false) // Controls sidebar visibility on mobile
  const [collapsed, setCollapsed] = useState(false)
  const dispatch = useAppDispatch()

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

  if (!isAuthenticated) {
    return <Navigate to={'/auth/sign-in'} />
  }

  // Profile menu dropdown items
  const profileMenu = (
    <Menu>
      <Menu.Item key='profile' icon={<UserOutlined />}>
        Profile
      </Menu.Item>
      <Menu.Divider />
      <Menu.Item
        key='logout'
        icon={<LogoutOutlined />}
        danger
        onClick={() => dispatch(AUTH_CLEAR())}
      >
        Logout
      </Menu.Item>
    </Menu>
  )

  // Sidebar content
  const sidebarContent = (
    <div className='h-screen flex flex-col bg-gray-50 dark:bg-gray-800'>
      {/* Sidebar Logo (Fixed at the Top) */}
      <div className='text-dark dark:text-white text-xl p-4 text-center font-bold shrink-0'>
        {collapsed && !isMobile ? 'AI' : 'Acme Inc'}
      </div>

      {/* Scrollable Menu List */}
      <div className='flex-1 overflow-y-auto'>
        <Menu
          mode='inline'
          className='h-full bg-gray-50 dark:bg-gray-800 border-0'
        >
          <Menu.Item key='1' icon={<HomeOutlined />}>
            Dashboard
          </Menu.Item>
          <Menu.SubMenu key='sub1' icon={<AppstoreOutlined />} title='Platform'>
            <Menu.Item key='2' icon={<FileOutlined />}>
              Playground
            </Menu.Item>
            <Menu.Item key='3' icon={<FileTextOutlined />}>
              Models
            </Menu.Item>
          </Menu.SubMenu>
          <Menu.SubMenu key='sub2' icon={<SettingOutlined />} title='Settings'>
            <Menu.Item key='4' icon={<UserOutlined />}>
              General
            </Menu.Item>
            <Menu.Item key='5' icon={<TeamOutlined />}>
              Team
            </Menu.Item>
          </Menu.SubMenu>
        </Menu>
      </div>

      {/* Profile Section (Fixed at the Bottom) */}
      <div className='p-4 border-t cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-700 transition shrink-0'>
        <Dropdown overlay={profileMenu} trigger={['click']}>
          <div className='flex items-center gap-3'>
            <Avatar src='https://randomuser.me/api/portraits/men/32.jpg' />
            {!collapsed && (
              <div className=' dark:text-white'>
                <div className='font-bold'>shadcn</div>
                <div className='text-sm'>m@example.com</div>
              </div>
            )}
          </div>
        </Dropdown>
      </div>
    </div>
  )

  return (
    <div className={isDarkMode ? 'dark' : ''}>
      <Layout className='min-h-screen'>
        {/* Sidebar: Normal on Desktop, Hidden & Overlay on Mobile */}
        {!isMobile ? (
          <Layout.Sider
            collapsed={collapsed}
            onCollapse={setCollapsed}
            className='bg-gray-50 dark:bg-gray-800 flex flex-col'
            width={270}
          >
            {sidebarContent}
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
            {sidebarContent}
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
              <Breadcrumb className='text-gray-600 dark:text-gray-300'>
                <Breadcrumb.Item>Building Your Application</Breadcrumb.Item>
                <Breadcrumb.Item>Data Fetching</Breadcrumb.Item>
              </Breadcrumb>
            </div>

            {/* Dark Mode Toggle */}
            <Switch
              checked={isDarkMode}
              checkedChildren={<BulbOutlined />}
              unCheckedChildren={<BulbOutlined />}
              onChange={() => toggleTheme()}
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
