import { Router } from 'express'
import { index } from './v1/index.router'
import { store } from './v1/store.router'
import { show } from './v1/show.router'
import { update } from './v1/update.router'
import { destroy } from './v1/destroy.router'
import { ValidationService } from '@/app/services/validation.service'

const roleRouterV1 = Router()

roleRouterV1.get('/', ValidationService.requireAuth, index)
roleRouterV1.post('/', ValidationService.requireAuth, store)
roleRouterV1.get('/:id', ValidationService.requireAuth, show)
roleRouterV1.put('/:id', ValidationService.requireAuth, update)
roleRouterV1.delete('/:id', ValidationService.requireAuth, destroy)

export { roleRouterV1 }
