import { Request, Response } from 'express'
import { prisma } from '../../prisma'
import { NotFoundError } from '../../errors/not-found-err'
import { ProductValidator } from './validator'
import { JoiValidationError } from '../../errors/joi-validation-err'

export class ProductController {
  static getAll = async (req: Request, res: Response) => {
    const products = await prisma.product.findMany({
      where: req.query,
    })
    return res.status(200).send(products)
  }

  static getAllWithJoiValidationLv1 = async (req: Request, res: Response) => {
    const { error, value } =
      ProductValidator.validateGetAllQueryWithJoiValidationLv1(req.query)

    if (error) throw new JoiValidationError(error)

    const products = await prisma.product.findMany({
      where: value,
    })
    return res.status(200).send(products)
  }

  static getAllWithJoiValidationLv2 = async (req: Request, res: Response) => {
    const { error, value } =
      ProductValidator.validateGetAllQueryWithJoiValidationLv2(req.query)

    if (error) throw new JoiValidationError(error)

    const products = await prisma.product.findMany({
      where: value,
    })
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

  static createWithJoiValidationLv1 = async (req: Request, res: Response) => {
    const { error, value } =
      ProductValidator.validateCreatePayloadWithJoiValidationLv1(req.body)

    if (error) throw new JoiValidationError(error)

    const product = await prisma.product.create({
      data: value,
    })

    return res.status(201).send(product)
  }

  static createWithJoiValidationLv2 = async (req: Request, res: Response) => {
    const { error, value } =
      ProductValidator.validateCreatePayloadWithJoiValidationLv2(req.body)

    if (error) throw new JoiValidationError(error)

    const product = await prisma.product.create({
      data: value,
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
