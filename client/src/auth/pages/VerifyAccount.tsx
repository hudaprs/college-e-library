import { ErrorViewer } from '@/app/components/common/ErrorViewer'
import { useAuthVerifyMutation } from '@/app/redux/auth.redux.rtk'
import { JwtSignType } from '@/app/types/jwt.type'
import { Button, Result, Spin } from 'antd'
import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

export const VerifyAccount = () => {
  const params = useParams<{ token: string }>()
  const [verify, { error, isLoading }] = useAuthVerifyMutation()
  const [isVerified, setIsVerified] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    ;(async () => {
      try {
        await verify({
          signType: JwtSignType.VERIFY_USER,
          token: params.token as string
        }).unwrap()

        setIsVerified(true)

        setTimeout(() => {
          navigate('/auth/sign-in')
        }, 3000)
      } finally {
        //
      }
    })()

    // eslint-disable-next-line
  }, [params.token, navigate])

  return (
    <div className='flex flex-col'>
      <Result
        status={isVerified ? 'success' : 'info'}
        title={
          isLoading
            ? 'Processing your account to be verified'
            : isVerified
              ? 'You Account has been verified, if page not redirected, click link below'
              : 'Verify Account'
        }
        subTitle={isLoading && 'Please wait...'}
        extra={[
          isLoading && <Spin />,
          !isLoading && (
            <Button type='primary' onClick={() => navigate('/auth/sign-in')}>
              Sign In
            </Button>
          )
        ]}
      />

      <ErrorViewer error={error} />
    </div>
  )
}
