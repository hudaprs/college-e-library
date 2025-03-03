import { memo, Suspense } from 'react'
import { BrowserRouter, Routes } from 'react-router-dom'
import { Router as AuthRouter } from '@/auth/routes/Router'
import { Router as AllRouter } from '@/app/routes/Router'
import { PageLoader } from '@/app/components/common/PageLoader'

export const AppRouter = memo(() => {
  return (
    <BrowserRouter>
      <Suspense fallback={<PageLoader />}>
        <Routes>
          {AuthRouter()}
          {AllRouter()}
        </Routes>
      </Suspense>
    </BrowserRouter>
  )
})
