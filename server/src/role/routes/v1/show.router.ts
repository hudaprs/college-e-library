import type { Request, Response } from 'express'
import { Role } from '@/app/models/role.model'

export const show = async (req: Request, res: Response) => {
  const { id } = req.params

  const role = await Role.findById(id)

  if (!role)
    throw new Error('Role not found', {
      cause: {
        statusCode: 404
      }
    })

  res.status(200).json({
    message: 'Successfully get role detail',
    results: role
  })
}
