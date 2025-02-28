import { Router } from 'express'
import { authRouterV1 } from '@/auth/routes/v1.router'
import { userRouterV1 } from '@/user/routes/v1.router'
import { roleRouterV1 } from '@/role/routes/v1.router'
import { permissionRouterV1 } from '@/permission/routes/v1.router'
import { systemRouterV1 } from '@/system/routes/v1.router'

const rootRouter = Router()

rootRouter.use('/api/v1/auth', authRouterV1)
rootRouter.use('/api/v1/users', userRouterV1)
rootRouter.use('/api/v1/roles', roleRouterV1)
rootRouter.use('/api/v1/permissions', permissionRouterV1)
rootRouter.use('/api/v1/systems', systemRouterV1)

export { rootRouter }
