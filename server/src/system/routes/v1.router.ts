import { Router } from 'express'
import { index } from '@/system/routes/v1/index.router'
import { store } from '@/system/routes/v1/store.router'
import { show } from '@/system/routes/v1/show.router'
import { update } from '@/system/routes/v1/update.router'
import { destroy } from '@/system/routes/v1/destroy.router'
import { approval } from '@/system/routes/v1/approval.router'
import { syncStaff } from '@/system/routes/v1/sync-staff.router'
import { ValidationService } from '@/app/services/validation.service'

const systemRouterV1 = Router()

systemRouterV1.get('/', ValidationService.requireAuth, index)
systemRouterV1.post('/', ValidationService.requireAuth, store)
systemRouterV1.get('/:id', ValidationService.requireAuth, show)
systemRouterV1.put('/:id', ValidationService.requireAuth, update)
systemRouterV1.delete('/:id', ValidationService.requireAuth, destroy)
systemRouterV1.patch('/:id/approval', ValidationService.requireAuth, approval)
systemRouterV1.patch(
  '/:id/sync-staff',
  ValidationService.requireAuth,
  syncStaff
)

export { systemRouterV1 }
