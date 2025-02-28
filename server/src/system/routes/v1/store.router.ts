import type { Request, Response } from 'express'
import { System } from '@/app/models/system.model'
import { ValidationService } from '@/app/services/validation.service'
import { storeSchema } from '@/system/schemas/v1/store.schema'
import { PermissionCode } from '@/app/types/permission.type'

export const store = async (req: Request, res: Response) => {
  await ValidationService.hasPermissions(req.currentUser.id, [
    PermissionCode.CREATE_SYSTEM
  ])

  const { name, address, phoneNumber } =
    await ValidationService.validateBodyRequest(req.body, storeSchema)

  const system = await System.build({
    name,
    address,
    phoneNumber,
    requestedBy: req.currentUser.id
  }).save()

  const fullSystem = await system.populate([
    'requestedBy',
    'approvalHistories.processedBy'
  ])

  res.status(201).json({
    message: 'Successfully create system',
    results: fullSystem
  })
}
