import type { Request, Response } from 'express'
import { Role } from '@/app/models/role.model'
import { ValidationService } from '@/app/services/validation.service'
import { PermissionCode } from '@/app/types/permission.type'
import mongoose from 'mongoose'

export const show = async (req: Request, res: Response) => {
  await ValidationService.hasPermissions(req.currentUser.id, [
    PermissionCode.VIEW_ROLE
  ])

  const id = new mongoose.Types.ObjectId(req.params.id)

  const role = await Role.findById(id)

  if (!role)
    throw new Error('Role not found', {
      cause: {
        statusCode: 404
      }
    })

  res.status(200).json({
    message: 'Successfully get role detail',
    results: role
  })
}
