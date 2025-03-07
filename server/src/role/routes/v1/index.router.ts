import type { Request, Response } from 'express'
import { Role } from '@/app/models/role.model'
import type { BaseQueryParams } from '@/app/types/query.type'
import { ValidationService } from '@/app/services/validation.service'
import { PermissionCode } from '@/app/types/permission.type'

export const index = async (req: Request, res: Response) => {
  await ValidationService.hasPermissions(req.currentUser.id, [
    PermissionCode.VIEW_ROLE
  ])

  const page = Number(req.query?.page || 1)
  const limit = Number(req.query?.limit || 10)
  const { q = '' } = req.query as unknown as BaseQueryParams

  const filter = q ? { $text: { $search: q } } : {}

  const roles = await Role.find(filter)
    .limit(limit)
    .skip((page - 1) * limit)
    .sort({ createdAt: -1, _id: 1 })
  const count = await Role.countDocuments(filter)

  res.status(200).json({
    message: 'Successfully get role list',
    results: {
      data: roles,
      count,
      totalPages: Math.ceil(count / limit)
    }
  })
}
