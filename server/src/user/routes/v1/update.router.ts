import type { Request, Response } from 'express'
import { User } from '@/app/models/user.model'
import { ValidationService } from '@/app/services/validation.service'
import { updateSchema } from '@/app/schemas/user/v1/update.schema'
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

  const existedUser = await User.findOne({ email })

  if (existedUser)
    throw new Error('Email already exists', { cause: { statusCode: 400 } })

  if (body?.password && body.password.length < 8) {
    throw new Error('Password minimal length is 8', {
      cause: {
        statusCode: 400
      }
    })
  }

  const user = await User.build({
    name: body.name,
    email
    // password: body?.password ? body.password : existedUser.,
    // roles: body.roles.map(role => ({ roleId: role, isActive: false }))
  }).save()

  const fullUser = await user.populate('roles')

  res.status(200).json({
    message: 'Successfully create user',
    results: fullUser
  })
}
