import type { Request, Response } from 'express'
import { User } from '@/app/models/user.model'
import { ValidationService } from '@/app/services/validation.service'
import { changeActiveRoleSchema } from '@/auth/schemas/v1/change-active-role.schema'
import { Role } from '@/app/models/role.model'

export const changeActiveRole = async (req: Request, res: Response) => {
  const { roleId } = await ValidationService.validateBodyRequest(
    req.body,
    changeActiveRoleSchema
  )

  const roles = await Role.find()

  if (roles.length === 0) {
    throw new Error('No role exists inside system', {
      cause: {
        statusCode: 400
      }
    })
  }

  const user = await User.findById(req.currentUser.id)
  if (!user) {
    throw new Error('User not found', {
      cause: 400
    })
  }

  if (!user.roles.some(role => role.role.toString() === roleId))
    throw new Error('Role invalid', {
      cause: {
        statusCode: 400
      }
    })

  if (!roles.some(role => role.id.toString() === roleId)) {
    throw new Error('Role that you requested is not valid with our system', {
      cause: {
        statusCode: 400
      }
    })
  }

  const updatedUser = await User.findByIdAndUpdate(
    req.currentUser.id,
    {
      $set: {
        roles: user.roles.map(role => ({
          role: role.role,
          isActive: role.role.toString() === roleId ? true : false
        }))
      }
    },
    {
      new: true
    }
  ).populate('roles.role')

  res.status(200).json({
    message: 'Successfully change active role',
    results: updatedUser
  })
}
