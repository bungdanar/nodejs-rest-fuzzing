import { Request, Response } from 'express'
import { prisma } from '../../prisma'
import { NotFoundError } from '../../errors/not-found-err'

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

  static update = async (req: Request, res: Response) => {
    const id = parseInt(req.params.id)

    let product = await prisma.product.findUnique({
      where: {
        id,
      },
    })

    if (!product) throw new NotFoundError('Product not found')

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

    product = await prisma.product.update({
      where: {
        id,
      },
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

    return res.status(200).send(product)
  }
}
