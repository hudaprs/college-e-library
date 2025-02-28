import type { Request, Response } from 'express'
import { Role } from '@/app/models/role.model'
import { ValidationService } from '@/app/services/validation.service'
import { Permission } from '@/app/models/permission.model'
import { updateSchema } from '@/role/schemas/v1/update.schema'
import { PermissionCode } from '@/app/types/permission.type'

export const update = async (req: Request, res: Response) => {
  await ValidationService.hasPermissions(req.currentUser.id, [
    PermissionCode.UPDATE_ROLE
  ])

  const { id } = req.params
  const body = await ValidationService.validateBodyRequest(
    req.body,
    updateSchema
  )

  const permissionCodes = body.permissions.map(permission => permission.code)

  const permissions = await Permission.find({
    code: { $in: permissionCodes }
  })

  const unRegisteredPermissionCodes = permissionCodes.filter(
    permissionCode =>
      !permissions.some(permission => permission.code === permissionCode)
  )
  if (unRegisteredPermissionCodes.length > 0) {
    throw new Error('Validation Error', {
      cause: {
        statusCode: 400,
        errors: unRegisteredPermissionCodes.map(permissionCode => ({
          message: `Permission ${permissionCode} doesn't exists`
        }))
      }
    })
  }

  const role = await Role.findById(id)
  if (!role)
    throw new Error('Role not found', {
      cause: {
        statusCode: 404
      }
    })

  const updatedRole = await Role.findByIdAndUpdate(
    role.id,
    {
      $set: {
        name: body.name,
        permissions: body.permissions
      }
    },
    {
      new: true
    }
  )

  res.status(200).json({
    message: 'Successfully update role',
    results: updatedRole
  })
}
