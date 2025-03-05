import { Route } from 'react-router-dom'
import { Layout } from '@/dashboard/layouts/Layout'
import { lazy } from 'react'

const Dashboard = lazy(() =>
  import('@/dashboard/pages/Dashboard').then(module => ({
    default: module.Dashboard
  }))
)

export const Router = () => {
  return (
    <Route path='dashboard' element={<Layout />}>
      <Route index element={<Dashboard />} />
    </Route>
  )
}
