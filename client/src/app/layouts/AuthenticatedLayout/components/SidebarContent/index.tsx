import { memo, useMemo } from 'react'
import type { SidebarContentProps, SidebarItem } from './types'
import { Menu } from 'antd'
import { HomeOutlined, UserOutlined } from '@ant-design/icons'
import { Profile } from './components/Profile'
import { useLocation, useNavigate } from 'react-router-dom'

export const SidebarContent = memo(
  ({ isCollapsed, isMobile }: SidebarContentProps) => {
    const location = useLocation()
    const navigate = useNavigate()
    const menus = useMemo((): SidebarItem[] => {
      return [
        { key: '/dashboard', label: 'Dashboard', icon: <HomeOutlined /> },
        {
          key: '/users',
          label: 'User Management',
          icon: <UserOutlined />,
          children: [
            {
              key: '/user-management/users',
              label: 'Users',
              onClick: () => {
                navigate('/user-management/users')
              }
            },
            {
              key: '/user-management/roles',
              label: 'Roles',
              onClick: () => {
                navigate('/user-management/roles')
              }
            },
            {
              key: '/user-management/permissions',
              label: 'Permissions',
              onClick: () => {
                navigate('/user-management/roles')
              }
            }
          ]
        }
      ]
    }, [navigate])

    const activeMenuKey = useMemo(
      () =>
        menus
          .flatMap(menu =>
            menu?.children
              ? [menu.key, ...(menu?.children?.map?.(child => child.key) || [])]
              : menu.key
          )
          .find(key => location.pathname.startsWith(key)),
      [location.pathname, menus]
    )

    return (
      <div className='h-screen flex flex-col bg-gray-50 dark:bg-gray-800'>
        {/* Sidebar Logo (Fixed at the Top) */}
        <div className='text-dark dark:text-white text-xl p-4 text-center font-bold shrink-0'>
          {isCollapsed && !isMobile ? 'AI' : 'Acme Inc'}
        </div>

        {/* Scrollable Menu List */}
        <div className='flex-1 overflow-y-auto'>
          <Menu
            mode='inline'
            className='h-full bg-gray-50 dark:bg-gray-800 border-0'
            selectedKeys={[activeMenuKey!]}
            items={menus}
          />
        </div>

        {/* Profile Section (Fixed at the Bottom) */}
        <div className='p-4 border-t cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-700 transition shrink-0'>
          <Profile isCollapsed={isCollapsed} />
        </div>
      </div>
    )
  }
)
