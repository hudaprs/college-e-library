import type { Request, Response } from 'express'
import { User } from '@/app/models/user.model'
import { ValidationService } from '@/app/services/validation.service'
import { PermissionCode } from '@/app/types/permission.type'

export const destroy = async (req: Request, res: Response) => {
  await ValidationService.hasPermissions(req.currentUser.id, [
    PermissionCode.DELETE_USER
  ])

  const { id } = req.params

  const user = await User.findById(id)

  if (!user)
    throw new Error('User not found', {
      cause: {
        statusCode: 404
      }
    })

  const deletedUser = await User.findByIdAndDelete(user.id).populate(
    'roles.role'
  )

  res.status(200).json({
    message: 'Successfully delete user',
    results: deletedUser
  })
}
