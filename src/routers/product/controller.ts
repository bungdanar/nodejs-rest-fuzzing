import { Request, Response } from 'express'
import { prisma } from '../../prisma'

export class ProductController {
  static getProduct = async (req: Request, res: Response) => {
    const products = await prisma.product.findMany()
    return res.status(200).send(products)
  }
}
