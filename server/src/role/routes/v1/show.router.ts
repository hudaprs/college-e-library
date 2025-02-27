import type { Request, Response } from 'express'

export const show = (req: Request, res: Response) => {
  res.send(200).json({ message: 'Role Detail' })
}
