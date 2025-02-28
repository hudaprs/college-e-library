import type { Request, Response } from 'express'
import { System } from '@/app/models/system.model'
import { User } from '@/app/models/user.model'
import { ValidationService } from '@/app/services/validation.service'
import { PermissionCode } from '@/app/types/permission.type'
import mongoose from 'mongoose'
import { syncStaffSchema } from '@/system/schemas/v1/sync-staff.schema'

export const syncStaff = async (req: Request, res: Response) => {
  await ValidationService.hasPermissions(req.currentUser.id, [
    PermissionCode.UPDATE_SYSTEM
  ])

  const id = new mongoose.Types.ObjectId(req.params.id)

  const { userIds } = await ValidationService.validateBodyRequest(
    req.body,
    syncStaffSchema
  )

  const mapUserIds = userIds.map(userId => new mongoose.Types.ObjectId(userId))

  const system = await System.findById(id)

  if (!system)
    throw new Error('System not found', {
      cause: {
        statusCode: 404
      }
    })

  const users = await User.find({ _id: mapUserIds })
  if (
    mapUserIds.filter(userId => !users.some(user => userId.equals(user.id)))
      .length > 0
  ) {
    throw new Error('Cannot sync staff, staff not registered', {
      cause: {
        statusCode: 400
      }
    })
  }

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

  const updatedSystem = await System.findByIdAndUpdate(
    system.id,
    {
      $set: {
        staffs: mapUserIds
      }
    },
    {
      new: true
    }
  ).populate(['requestedBy', 'approvalHistories.processedBy', 'staffs'])

  res.status(200).json({
    message: 'Successfully sync staff in system',
    results: updatedSystem
  })
}
