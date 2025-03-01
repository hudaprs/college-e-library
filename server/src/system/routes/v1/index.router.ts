import type { Request, Response } from 'express'
import { System } from '@/app/models/system.model'
import type { BaseQueryParams } from '@/app/types/query.type'
import { ValidationService } from '@/app/services/validation.service'
import { PermissionCode } from '@/app/types/permission.type'

export const index = async (req: Request, res: Response) => {
  await ValidationService.hasPermissions(req.currentUser.id, [
    PermissionCode.VIEW_SYSTEM,
    PermissionCode.VIEW_SYSTEM_STAFF
  ])

  const page = Number(req.query?.page || 1)
  const limit = Number(req.query?.limit || 10)
  const { q = '' } = req.query as unknown as BaseQueryParams

  const filter = (q ? { $text: { $search: q } } : {}) as Record<string, unknown>

  const isSystemAdmin = await ValidationService.hasPermissionSync(
    req.currentUser.id,
    [PermissionCode.ADMIN_SYSTEM]
  )

  if (!isSystemAdmin) {
    const isSystemStaff = await ValidationService.hasPermissionSync(
      req.currentUser.id,
      [PermissionCode.VIEW_SYSTEM_STAFF]
    )

    if (isSystemStaff) {
      filter.staffs = { $in: [req.currentUser.id] }
    } else {
      filter.requestedBy = req.currentUser.id
    }
  }

  const systems = await System.find(filter)
    .limit(limit)
    .skip((page - 1) * limit)
    .sort({ createdAt: -1, _id: 1 })
    .populate(['requestedBy', 'approvalHistories.processedBy', 'staffs'])
  const count = await System.countDocuments(filter)

  res.status(200).json({
    message: 'Successfully get system list',
    results: {
      data: systems,
      count,
      totalPages: Math.ceil(count / limit)
    }
  })
}
