import type { Request, Response } from 'express'
import { User } from '@/app/models/user.model'

export const show = async (req: Request, res: Response) => {
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
