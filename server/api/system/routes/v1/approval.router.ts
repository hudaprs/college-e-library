import type { Request, Response } from 'express'
import { System } from '@/app/models/system.model'
import { ValidationService } from '@/app/services/validation.service'
import { PermissionCode } from '@/app/types/permission.type'
import { SystemApprovalStatus } from '@/app/types/system.type'
import { approvalSchema } from '@/system/schemas/v1/approval.schema'
import mongoose from 'mongoose'

export const approval = async (req: Request, res: Response) => {
  await ValidationService.hasPermissions(req.currentUser.id, [
    PermissionCode.ADMIN_SYSTEM
  ])

  const id = new mongoose.Types.ObjectId(req.params.id)

  const { remark, status } = await ValidationService.validateBodyRequest(
    req.body,
    approvalSchema
  )

  const system = await System.findById(id)

  if (!system)
    throw new Error('System not found', {
      cause: {
        statusCode: 404
      }
    })

  if (
    system.status === SystemApprovalStatus.PENDING &&
    [
      SystemApprovalStatus.PENDING,
      SystemApprovalStatus.REJECT,
      SystemApprovalStatus.APPROVE
    ].includes(status)
  ) {
    throw new Error(
      `Pending system need to be ${SystemApprovalStatus.PROCESS} first`,
      {
        cause: {
          statusCode: 400
        }
      }
    )
  }

  if (
    system.status === SystemApprovalStatus.PROCESS &&
    [SystemApprovalStatus.PENDING, SystemApprovalStatus.PROCESS].includes(
      status
    )
  ) {
    throw new Error(
      `Can't process to ${status === SystemApprovalStatus.PENDING ? SystemApprovalStatus.PENDING : SystemApprovalStatus.PROCESS} again, please choose ${SystemApprovalStatus.REJECT} or ${SystemApprovalStatus.APPROVE}`,
      {
        cause: {
          statusCode: 400
        }
      }
    )
  }

  if (
    [SystemApprovalStatus.REJECT, SystemApprovalStatus.APPROVE].includes(
      system.status
    )
  ) {
    throw new Error(
      `Can't process system that has been ${system.status === SystemApprovalStatus.APPROVE ? SystemApprovalStatus.APPROVE : SystemApprovalStatus.REJECT}ed`,
      {
        cause: {
          statusCode: 400
        }
      }
    )
  }

  const updatedSystem = await System.findByIdAndUpdate(
    system.id,
    {
      $push: {
        approvalHistories: {
          remark,
          status,
          processedBy: req.currentUser.id
        }
      },
      $set: { status }
    },
    {
      new: true
    }
  ).populate(['requestedBy', 'approvalHistories.processedBy'])

  res.status(200).json({
    message: 'Successfully making action to system',
    results: updatedSystem
  })
}
