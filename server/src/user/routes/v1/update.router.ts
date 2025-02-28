import type { Request, Response } from 'express'
import { User, type UserBuildAttrs } from '@/app/models/user.model'
import { ValidationService } from '@/app/services/validation.service'
import { updateSchema } from '@/user/schemas/v1/update.schema'
import { Role } from '@/app/models/role.model'

export const update = async (req: Request, res: Response) => {
  const { id } = req.params
  const body = await ValidationService.validateBodyRequest(
    req.body,
    updateSchema
  )

  const roles = await Role.find({
    _id: { $in: body.roles }
  })

  const unRegisteredRoles = body.roles.filter(
    roleId => !roles.some(role => role.id === roleId)
  )
  if (unRegisteredRoles.length > 0) {
    throw new Error('Validation Error', {
      cause: {
        statusCode: 400,
        errors: unRegisteredRoles.map(roleId => ({
          message: `Role with ID ${roleId} doesn't exists`
        }))
      }
    })
  }

  const email = body.email.replace(/\s+/, '').trim().toLowerCase()

  const existedUser = await User.findById(id).populate('roles')

  if (!existedUser)
    throw new Error('User not found', {
      cause: {
        statusCode: 404
      }
    })

  const usersExcludedCurrentUpdated = await User.find({
    email: { $ne: existedUser.email }
  })

  if (usersExcludedCurrentUpdated.some(user => user.email === email)) {
    throw new Error('Email already registered', {
      cause: {
        statusCode: 400
      }
    })
  }

  if (body?.password && body.password.length < 8) {
    throw new Error('Validation Error', {
      cause: {
        statusCode: 422,
        errors: [{ message: 'Password minimal length is 8', field: 'password' }]
      }
    })
  }

  const payload: Partial<UserBuildAttrs> = {
    name: body.name,
    roles: body.roles.map(roleId => {
      const existingRole = existedUser.roles.find(
        role => role.role.toString() === roleId
      )

      return {
        isActive: existingRole?.isActive || false,
        role: roleId
      }
    })
  }

  if (body?.password) {
    payload.password = body.password
  }

  const updatedUser = await User.findByIdAndUpdate(
    existedUser.id,
    {
      $set: payload
    },
    {
      new: true
    }
  ).populate('roles.role')

  res.status(200).json({
    message: 'Successfully update user',
    results: updatedUser
  })
}
