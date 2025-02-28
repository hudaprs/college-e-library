import type { Request, Response } from 'express'
import { Role } from '@/app/models/role.model'
import { ValidationService } from '@/app/services/validation.service'
import { PermissionCode } from '@/app/types/permission.type'

export const destroy = async (req: Request, res: Response) => {
  await ValidationService.hasPermissions(req.currentUser.id, [
    PermissionCode.DELETE_ROLE
  ])

  const { id } = req.params

  const role = await Role.findById(id)

  if (!role)
    throw new Error('Role not found', {
      cause: {
        statusCode: 404
      }
    })

  const deletedRole = await Role.findByIdAndDelete(role.id)

  res.status(200).json({
    message: 'Successfully delete role',
    results: deletedRole
  })
}
