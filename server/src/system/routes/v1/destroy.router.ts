import type { Request, Response } from 'express'
import { System } from '@/app/models/system.model'
import { ValidationService } from '@/app/services/validation.service'
import { PermissionCode } from '@/app/types/permission.type'
import { SystemApprovalStatus } from '@/app/types/system.type'
import mongoose from 'mongoose'

export const destroy = async (req: Request, res: Response) => {
  await ValidationService.hasPermissions(req.currentUser.id, [
    PermissionCode.DELETE_SYSTEM
  ])

  const id = new mongoose.Types.ObjectId(req.params.id)

  const system = await System.findById(id)

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

  if (!isFullAccess && !system.requestedBy.equals(req.currentUser.id)) {
    throw new Error(`You don't have access to this system`, {
      cause: {
        statusCode: 403
      }
    })
  }

  if (system.status !== SystemApprovalStatus.PENDING) {
    throw new Error(`Can't delete System that has been processed`, {
      cause: {
        statusCode: 400
      }
    })
  }

  const deletedSystem = await System.findByIdAndDelete(system.id).populate([
    'requestedBy',
    'approvalHistories.processedBy'
  ])

  res.status(200).json({
    message: 'Successfully delete system',
    results: deletedSystem
  })
}
