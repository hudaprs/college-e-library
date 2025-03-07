import { Router } from 'express'
import { index } from '@/permission/routes/v1/index.router'
import { ValidationService } from '@/app/services/validation.service'

const permissionRouterV1 = Router()

permissionRouterV1.get('/', ValidationService.requireAuth, index)

export { permissionRouterV1 }
