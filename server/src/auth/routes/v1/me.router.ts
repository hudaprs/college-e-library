import type { Request, Response } from 'express'
import { User } from '@/app/models/user.model'

export const me = async (req: Request, res: Response) => {
  if (!req?.currentUser)
    throw new Error('Unauthorized', {
      cause: {
        statusCode: 401
      }
    })

  const user = await User.findById(req.currentUser.id)

  if (!user)
    throw new Error('Unauthorized account', {
      cause: {
        statusCode: 401
      }
    })

  res.status(200).json({
    message: `Hi ${user.name}`,
    results: user
  })
}
