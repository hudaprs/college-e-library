import type { Request, Response } from 'express'

export const update = (req: Request, res: Response) => {
  res.send(200).json({ message: 'Role Updated' })
}
