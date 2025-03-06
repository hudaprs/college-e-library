import { Avatar, Dropdown } from 'antd'
import { memo } from 'react'
import type { ProfileProps } from './types'
import { LogoutOutlined, UserOutlined } from '@ant-design/icons'
import { useAppDispatch } from '@/app/redux'
import { AUTH_CLEAR } from '@/app/redux/auth.redux.slice'

export const Profile = memo(({ isCollapsed }: ProfileProps) => {
  const dispatch = useAppDispatch()

  return (
    <Dropdown
      menu={{
        items: [
          {
            key: 'profile',
            label: 'Profile',
            icon: <UserOutlined />
          },
          {
            key: 'logout',
            label: 'Logout',
            icon: <LogoutOutlined />,
            danger: true,
            onClick: () => dispatch(AUTH_CLEAR())
          }
        ]
      }}
      trigger={['click']}
    >
      <div className='flex items-center gap-3'>
        <Avatar src='https://randomuser.me/api/portraits/men/32.jpg' />
        {!isCollapsed && (
          <div className=' dark:text-white'>
            <div className='font-bold'>shadcn</div>
            <div className='text-sm'>m@example.com</div>
          </div>
        )}
      </div>
    </Dropdown>
  )
})
