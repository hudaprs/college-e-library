import { Button, Card, Form, Input, Typography } from 'antd'
import { MoonOutlined, SunOutlined } from '@ant-design/icons'
import { useTheme } from '@/app/providers/UIProvider'
import { useCallback } from 'react'

export const ResetPassword = () => {
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
        Reset Password
      </Typography.Title>
      <Typography.Paragraph className='text-gray-600 dark:text-gray-400'>
        Enter new password to change your account password
      </Typography.Paragraph>

      <Form
        form={form}
        layout='vertical'
        onFinish={onFinish}
        scrollToFirstError={{ behavior: 'instant', block: 'end', focus: true }}
      >
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

        <Button type='primary' htmlType='submit' className='mt-2' block>
          Reset Password
        </Button>
      </Form>
    </Card>
  )
}
