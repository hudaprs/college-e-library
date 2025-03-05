import { memo, Suspense } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Router as AllRouter } from '@/app/routes/Router'
import { Router as AuthRouter } from '@/auth/routes/Router'
import { Router as DashboardRouter } from '@/dashboard/routes/Router'
import { PageLoader } from '@/app/components/common/PageLoader'
import { AuthenticatedLayout } from './app/layouts/AuthenticatedLayout'

export const AppRouter = memo(() => {
  return (
    <BrowserRouter>
      <Suspense fallback={<PageLoader />}>
        <Routes>
          {AuthRouter()}

          <Route element={<AuthenticatedLayout />}>{DashboardRouter()}</Route>

          {AllRouter()}
        </Routes>
      </Suspense>
    </BrowserRouter>
  )
})
