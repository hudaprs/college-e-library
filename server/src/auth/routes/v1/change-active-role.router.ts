import type { Request, Response } from 'express'
import { User } from '@/app/models/user.model'
import { ValidationService } from '@/app/services/validation.service'
import { changeActiveRoleSchema } from '@/auth/schemas/v1/change-active-role.schema'
import { Role } from '@/app/models/role.model'
import mongoose from 'mongoose'

export const changeActiveRole = async (req: Request, res: Response) => {
  const body = await ValidationService.validateBodyRequest(
    req.body,
    changeActiveRoleSchema
  )

  const roleId = new mongoose.Types.ObjectId(body.roleId)

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

  console.log('user.roles', user.roles)
  console.log('roleId', roleId)

  if (!user.roles.some(role => roleId.equals(role.role)))
    throw new Error('Role invalid', {
      cause: {
        statusCode: 400
      }
    })

  if (!roles.some(role => roleId.equals(role.id))) {
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
          isActive: roleId.equals(role.role) ? true : false
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
