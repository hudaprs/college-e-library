import type { Request, Response } from 'express'
import { Permission } from '@/app/models/permission.model'
import type { BaseQueryParams } from '@/app/types/query.type'
import { ValidationService } from '@/app/services/validation.service'
import { PermissionCode } from '@/app/types/permission.type'

export const index = async (req: Request, res: Response) => {
  await ValidationService.hasPermissions(req.currentUser.id, [
    PermissionCode.VIEW_PERMISSION
  ])

  const page = Number(req.query?.page || 1)
  const limit = Number(req.query?.limit || 10)
  const { q = '' } = req.query as unknown as BaseQueryParams

  const filter = q ? { $text: { $search: q } } : {}

  const permissions = await Permission.find(filter)
    .limit(limit)
    .skip((page - 1) * limit)
    .sort({ createdAt: -1, _id: 1 })
  const count = await Permission.countDocuments(filter)

  res.status(200).json({
    message: 'Successfully get permission list',
    results: {
      data: permissions,
      count,
      totalPages: Math.ceil(count / limit)
    }
  })
}
