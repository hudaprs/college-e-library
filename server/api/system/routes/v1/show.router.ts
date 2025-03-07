import type { Request, Response } from 'express'
import { System, type SystemDocumentPopulated } from '@/app/models/system.model'
import { ValidationService } from '@/app/services/validation.service'
import { PermissionCode } from '@/app/types/permission.type'
import mongoose from 'mongoose'

export const show = async (req: Request, res: Response) => {
  await ValidationService.hasPermissions(req.currentUser.id, [
    PermissionCode.VIEW_SYSTEM,
    PermissionCode.VIEW_SYSTEM_STAFF
  ])

  const id = new mongoose.Types.ObjectId(req.params.id)

  const system = (await System.findById(id).populate([
    'requestedBy',
    'approvalHistories.processedBy',
    'staffs'
  ])) as SystemDocumentPopulated | null

  if (!system)
    throw new Error('System not found', {
      cause: {
        statusCode: 404
      }
    })

  const isFullAccess = await ValidationService.hasPermissionSync(
    req.currentUser.id,
    [PermissionCode.ADMIN_SYSTEM]
  )

  if (
    !isFullAccess &&
    !new mongoose.Types.ObjectId(system.requestedBy.id).equals(
      req.currentUser.id
    ) &&
    !system.staffs.some(staff => staff.equals(req.currentUser.id))
  ) {
    throw new Error(`You don't have access to this system`, {
      cause: {
        statusCode: 403
      }
    })
  }

  res.status(200).json({
    message: 'Successfully get system detail',
    results: system
  })
}
