import { Route } from 'react-router-dom'
import { Layout } from '@/auth/layouts/Layout'
import { lazy } from 'react'

const SignIn = lazy(() =>
  import('@/auth/pages/SignIn').then(module => ({
    default: module.SignIn
  }))
)
const SignUp = lazy(() =>
  import('@/auth/pages/SignUp').then(module => ({
    default: module.SignUp
  }))
)
const ForgotPassword = lazy(() =>
  import('@/auth/pages/ForgotPassword').then(module => ({
    default: module.ForgotPassword
  }))
)
const ResetPassword = lazy(() =>
  import('@/auth/pages/ResetPassword').then(module => ({
    default: module.ResetPassword
  }))
)
const VerifyAccount = lazy(() =>
  import('@/auth/pages/VerifyAccount').then(module => ({
    default: module.VerifyAccount
  }))
)

export const Router = () => {
  return (
    <Route path='auth' element={<Layout />}>
      <Route path='sign-in' element={<SignIn />} />
      <Route path='sign-up' element={<SignUp />} />
      <Route path='forgot-password' element={<ForgotPassword />} />
      <Route path='reset-password' element={<ResetPassword />} />
      <Route path='verify-account' element={<VerifyAccount />} />
    </Route>
  )
}
