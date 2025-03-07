import type { Request, Response } from 'express'
import { User } from '@/app/models/user.model'
import { ValidationService } from '@/app/services/validation.service'
import { PermissionCode } from '@/app/types/permission.type'

export const show = async (req: Request, res: Response) => {
  await ValidationService.hasPermissions(req.currentUser.id, [
    PermissionCode.VIEW_USER
  ])

  const { id } = req.params

  const user = await User.findById(id).populate('roles.role')

  if (!user)
    throw new Error('User not found', {
      cause: {
        statusCode: 404
      }
    })

  res.status(200).json({
    message: 'Successfully get user detail',
    results: user
  })
}
