import type { Request, Response } from 'express'

export const store = (req: Request, res: Response) => {
  res.send(200).json({ message: 'Role Created' })
}
