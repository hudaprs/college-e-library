import { Result, Spin } from 'antd'

export const VerifyAccount = () => (
  <Result
    status='info'
    title='Processing your account to be verified'
    subTitle='Please wait...'
    extra={[<Spin />]}
  />
)
