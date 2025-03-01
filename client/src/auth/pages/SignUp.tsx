import { Button, Card, Form, Input, Typography } from 'antd'
import { MoonOutlined, SunOutlined } from '@ant-design/icons'
import { useTheme } from '@/app/providers/UIProvider'
import { useCallback } from 'react'
import { Link } from 'react-router-dom'

export const SignUp = () => {
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
        Sign Up
      </Typography.Title>
      <Typography.Paragraph className='text-gray-600 dark:text-gray-400'>
        Enter your email below to sign up to your account
      </Typography.Paragraph>

      <Form
        form={form}
        layout='vertical'
        onFinish={onFinish}
        scrollToFirstError={{ behavior: 'instant', block: 'end', focus: true }}
      >
        <Form.Item
          label={<span className='text-black dark:text-white'>Name</span>}
          name={'name'}
          rules={[{ required: true, message: 'Please enter your name' }]}
        >
          <Input
            placeholder='m@example.com'
            className='dark:bg-gray-800 dark:text-white'
          />
        </Form.Item>

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
            type='email'
            className='dark:bg-gray-800 dark:text-white'
            autoComplete='email'
          />
        </Form.Item>

        <Form.Item
          label={<span className='text-black dark:text-white'>Password</span>}
          name={'password'}
          rules={[
            { required: true, message: 'Please enter your password' },
            { min: 8, message: 'Password should have 8 characters' }
          ]}
        >
          <Input.Password
            className='dark:bg-gray-800 dark:text-white'
            autoComplete='new-password'
          />
        </Form.Item>

        <Form.Item
          label={
            <span className='text-black dark:text-white'>
              Password Confirmation
            </span>
          }
          name={'password2'}
          dependencies={['password']}
          rules={[
            {
              required: true,
              message: 'Please enter your password confirmation'
            },
            { min: 8, message: 'Password should have 8 characters' },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue('password') === value) {
                  return Promise.resolve()
                }
                return Promise.reject(
                  new Error(
                    'Password confirmation that you entered do not match!'
                  )
                )
              }
            })
          ]}
        >
          <Input.Password
            className='dark:bg-gray-800 dark:text-white'
            autoComplete='new-password'
          />
        </Form.Item>

        <Button type='primary' htmlType='submit' className='mt-4' block>
          Sign Up
        </Button>

        <Link to='/auth/sign-in'>
          <Typography.Paragraph className='text-center text-gray-600 dark:text-gray-400 mt-4'>
            Already Have account?{' '}
            <span className='text-blue-500 dark:text-blue-400'>Sign In</span>
          </Typography.Paragraph>
        </Link>
      </Form>
    </Card>
  )
}
