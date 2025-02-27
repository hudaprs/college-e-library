import type { Request, Response } from 'express'

export const destroy = (req: Request, res: Response) => {
  res.send(200).json({ message: 'Role Removed' })
}
