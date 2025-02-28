import type { Request, Response } from 'express'
import { User } from '@/app/models/user.model'
import type { BaseQueryParams } from '@/app/types/query.type'

export const index = async (req: Request, res: Response) => {
  const page = Number(req.query?.page || 1)
  const limit = Number(req.query?.limit || 10)
  const { q = '' } = req.query as unknown as BaseQueryParams

  const filter = q ? { $text: { $search: q } } : {}

  const users = await User.find(filter)
    .limit(limit)
    .skip((page - 1) * limit)
    .sort({ createdAt: -1, _id: 1 })
    .populate('roles.role')
  const count = await User.countDocuments(filter)

  res.status(200).json({
    message: 'Successfully get user list',
    results: {
      data: users,
      count,
      totalPages: Math.ceil(count / limit)
    }
  })
}
