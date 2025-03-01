import { Route } from 'react-router-dom'
import { Layout } from '@/app/layouts/Layout'
import { lazy } from 'react'

const NotFound = lazy(() =>
  import('@/app/pages/NotFound').then(module => ({
    default: module.NotFound
  }))
)

export const Router = () => {
  return (
    <Route element={<Layout />}>
      <Route path='*' element={<NotFound />} />
    </Route>
  )
}
