import { Button, Card, Form, Input, Typography } from 'antd'
import { MoonOutlined, SunOutlined } from '@ant-design/icons'
import { useTheme } from '@/app/providers/UIProvider'
import { useCallback } from 'react'
import { Link } from 'react-router-dom'

export const SignIn = () => {
  const [form] = Form.useForm()
  const { isDarkMode, toggleTheme } = useTheme()

  const onFinish = useCallback((value: unknown) => {
    console.log(value)
  }, [])

  return (
    <Card className='w-full max-w-md p-6 rounded-lg dark:bg-gray-900 shadow-lg'>
      {/* Theme Toggle Button */}
      <div className='flex justify-end'>
        <Button
          shape='circle'
          icon={isDarkMode ? <SunOutlined /> : <MoonOutlined />}
          onClick={toggleTheme}
        />
      </div>

      <Typography.Title level={2} className='text-black dark:text-white'>
        Sign In
      </Typography.Title>
      <Typography.Paragraph className='text-gray-600 dark:text-gray-400'>
        Enter your email below to sign in to your account
      </Typography.Paragraph>

      <Form
        form={form}
        layout='vertical'
        onFinish={onFinish}
        scrollToFirstError={{ behavior: 'instant', block: 'end', focus: true }}
      >
        <Form.Item
          label={<span className='text-black dark:text-white'>Email</span>}
          name={'email'}
          rules={[
            { required: true, message: 'Please enter your email' },
            { type: 'email', message: 'Invalid email format' }
          ]}
        >
          <Input
            placeholder='m@example.com'
            className='dark:bg-gray-800 dark:text-white'
            autoComplete='email'
          />
        </Form.Item>

        <Form.Item
          label={<span className='text-black dark:text-white'>Password</span>}
          name={'password'}
          rules={[{ required: true, message: 'Please enter your password' }]}
        >
          <Input.Password
            className='dark:bg-gray-800 dark:text-white'
            autoComplete='current-password'
          />
        </Form.Item>

        <div className='flex '>
          <Link to='/auth/forgot-password'>
            <Typography.Text className='text-blue-500 dark:text-blue-400 underline hover:cursor-pointer'>
              Forgot your password?
            </Typography.Text>
          </Link>
        </div>

        <Button type='primary' htmlType='submit' className='mt-4' block>
          Sign In
        </Button>

        <Link to='/auth/sign-up'>
          <Typography.Paragraph className='text-center text-gray-600 dark:text-gray-400 mt-4'>
            Don't have an account?{' '}
            <span className='text-blue-500 dark:text-blue-400'>Sign Up</span>
          </Typography.Paragraph>
        </Link>
      </Form>
    </Card>
  )
}
