import type { Request, Response } from 'express'
import { User } from '@/app/models/user.model'

export const destroy = async (req: Request, res: Response) => {
  const { id } = req.params

  const user = await User.findById(id)

  if (!user)
    throw new Error('User not found', {
      cause: {
        statusCode: 404
      }
    })

  const deletedUser = await User.findByIdAndDelete(user.id).populate('roles')

  res.status(200).json({
    message: 'Successfully delete user',
    results: deletedUser
  })
}
