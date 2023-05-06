import { Request, Response } from 'express'
import { prisma } from '../../prisma'

export class ExampleController {
  static getUsers = async (req: Request, res: Response) => {
    const users = await prisma.user.findMany()
    return res.status(200).send(users)
  }
}
