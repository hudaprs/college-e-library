import { Button, Card, Form, Input, Typography } from 'antd'
import { MoonOutlined, SunOutlined } from '@ant-design/icons'
import { useTheme } from '@/app/providers/UIProvider/hook'
import { useCallback, useMemo } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import {
  useAuthSignInMutation,
  useLazyAuthMeQuery
} from '@/app/redux/auth.redux.rtk'
import { ErrorViewer } from '@/app/components/common/ErrorViewer'
import { useAppDispatch } from '@/app/redux'
import {
  AUTH_SET_AUTHENTICATED_USER,
  AUTH_SET_TOKEN
} from '@/app/redux/auth.redux.slice'

type SignInForm = {
  email: string
  password: string
}

export const SignIn = () => {
  const [form] = Form.useForm()
  const { isDarkMode, toggleTheme } = useTheme()
  const [signIn, { error: signInError, isLoading: isSignInLoading }] =
    useAuthSignInMutation()
  const [me, { error: meError, isLoading: isMeLoading }] = useLazyAuthMeQuery()
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const isLoading = useMemo(() => {
    return isSignInLoading || isMeLoading
  }, [isSignInLoading, isMeLoading])

  const onFinish = useCallback(
    async (value: SignInForm) => {
      const signInResponse = await signIn(value).unwrap()

      dispatch(AUTH_SET_TOKEN(signInResponse.results))

      const meResponse = await me().unwrap()

      dispatch(AUTH_SET_AUTHENTICATED_USER(meResponse.results))

      navigate('/dashboard')
    },
    [signIn, dispatch, me, navigate]
  )

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
            disabled={isLoading}
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
            disabled={isLoading}
          />
        </Form.Item>

        <div className='flex '>
          <Link to='/auth/forgot-password'>
            <Typography.Text className='text-blue-500 dark:text-blue-400 underline hover:cursor-pointer'>
              Forgot your password?
            </Typography.Text>
          </Link>
        </div>

        <Button
          type='primary'
          htmlType='submit'
          className='mt-4'
          loading={isLoading}
          block
        >
          Sign In
        </Button>

        <ErrorViewer error={signInError || meError} />

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
