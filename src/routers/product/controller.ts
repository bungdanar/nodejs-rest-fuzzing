import { Request, Response } from 'express'
import { prisma } from '../../prisma'

export class ProductController {
  static getAll = async (req: Request, res: Response) => {
    const products = await prisma.product.findMany()
    return res.status(200).send(products)
  }

  static create = async (req: Request, res: Response) => {
    const {
      description,
      discount_price,
      name,
      note,
      quantity,
      regular_price,
      sku,
      weight,
      published,
    } = req.body

    const product = await prisma.product.create({
      data: {
        description,
        discount_price,
        name,
        note,
        quantity,
        regular_price,
        sku,
        weight,
        published,
      },
    })

    return res.status(201).send(product)
  }
}
