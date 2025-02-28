import type { Request, Response } from 'express'
import { Role } from '@/app/models/role.model'
import { ValidationService } from '@/app/services/validation.service'
import { storeSchema } from '@/app/schemas/role/v1/store.schema'
import { Permission } from '@/app/models/permission.model'

export const store = async (req: Request, res: Response) => {
  const body = await ValidationService.validateBodyRequest(
    req.body,
    storeSchema
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

  const role = await Role.build({
    name: body.name,
    createdBy: req.currentUser.id,
    permissions: body.permissions
  }).save()

  const fullRole = await role.populate('createdBy')

  res.status(200).json({
    message: 'Successfully create role',
    results: fullRole
  })
}
