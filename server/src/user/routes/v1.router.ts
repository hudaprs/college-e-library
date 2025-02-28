import { Router } from 'express'
import { index } from '@/user/routes/v1/index.router'
import { store } from '@/user/routes/v1/store.router'
import { show } from '@/user/routes/v1/show.router'
import { update } from '@/user/routes/v1/update.router'
import { destroy } from '@/user/routes/v1/destroy.router'
import { ValidationService } from '@/app/services/validation.service'

const userRouterV1 = Router()

userRouterV1.get('/', ValidationService.requireAuth, index)
userRouterV1.post('/', ValidationService.requireAuth, store)
userRouterV1.get('/:id', ValidationService.requireAuth, show)
userRouterV1.put('/:id', ValidationService.requireAuth, update)
userRouterV1.delete('/:id', ValidationService.requireAuth, destroy)

export { userRouterV1 }
