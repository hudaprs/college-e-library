import { Router } from 'express'
import { authRouterV1 } from '@/auth/routes/v1.router'
import { roleRouterV1 } from '@/role/routes/v1.router'

const rootRouter = Router()

rootRouter.use('/api/v1/auth', authRouterV1)
rootRouter.use('/api/v1/roles', roleRouterV1)

export { rootRouter }
