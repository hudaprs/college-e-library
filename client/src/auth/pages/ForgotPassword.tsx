import { Button, Card, Form, Input, Modal, Typography } from 'antd'
import { MoonOutlined, SunOutlined } from '@ant-design/icons'
import { useTheme } from '@/app/providers/UIProvider/hook'
import { useCallback } from 'react'
import { Link } from 'react-router-dom'
import { useAuthForgotPasswordMutation } from '@/app/redux/auth.redux.rtk'
import { ErrorViewer } from '@/app/components/common/ErrorViewer'

type ForgotPasswordProps = {
  email: string
}

export const ForgotPassword = () => {
  const [form] = Form.useForm()
  const { isDarkMode, toggleTheme } = useTheme()
  const [forgotPassword, { isLoading, error }] = useAuthForgotPasswordMutation()
  const [modal, contextHolder] = Modal.useModal()

  const onFinish = useCallback(
    async (value: ForgotPasswordProps) => {
      const response = await forgotPassword(value).unwrap()

      modal.confirm({
        title: response.message,
        centered: true
      })
    },
    [modal, forgotPassword]
  )

  return (
    <Card className='w-full max-w-md p-6 rounded-lg dark:bg-gray-900 shadow-lg'>
      {contextHolder}
      {/* Theme Toggle Button */}
      <div className='flex justify-end'>
        <Button
          shape='circle'
          icon={isDarkMode ? <SunOutlined /> : <MoonOutlined />}
          onClick={toggleTheme}
        />
      </div>

      <Typography.Title level={2} className='text-black dark:text-white'>
        Forgot Password
      </Typography.Title>
      <Typography.Paragraph className='text-gray-600 dark:text-gray-400'>
        Enter your email below to request verification email
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
            disabled={isLoading}
          />
        </Form.Item>

        <Button
          type='primary'
          htmlType='submit'
          className='mt-2'
          loading={isLoading}
          block
        >
          Send Email Verification
        </Button>

        <ErrorViewer error={error} />

        <Link to='/auth/sign-in'>
          <Typography.Paragraph className='text-center text-gray-600 dark:text-gray-400 mt-4'>
            Already have account?{' '}
            <span className='text-blue-500 dark:text-blue-400'>Sign In</span>
          </Typography.Paragraph>
        </Link>
      </Form>
    </Card>
  )
}
