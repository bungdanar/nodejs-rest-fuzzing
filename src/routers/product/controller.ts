import { Request, Response } from 'express'
import { ProductCreatePayload } from '../../data-type/product'
import { prisma } from '../../prisma'

export class ProductController {
  static create = async (req: Request, res: Response) => {
    const payload = req.body as ProductCreatePayload

    const product = await prisma.product.create({
      data: payload,
    })

    return res.status(200).send(product)
  }
}
