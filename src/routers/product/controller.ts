import { Request, Response } from 'express'
import { ProductService } from '../../utils/product-service'
import { ProductValidator } from './validator'
import { JoiValidationError } from '../../errors/joi-validation-err'
import { ZodValidationError } from '../../errors/zod-validation-err'

export class ProductController {
  static create = async (req: Request, res: Response) => {
    const product = await ProductService.create(req.body, null)

    return res.status(201).send(product)
  }

  static createWithPartialJoiValidation = async (
    req: Request,
    res: Response
  ) => {
    const { error, value } =
      ProductValidator.partialValidateCreatePayloadWithJoi(req.body)

    if (error) throw new JoiValidationError(error)

    const product = await ProductService.create(value, null)

    return res.status(201).send(product)
  }

  static createWithFullJoiValidation = async (req: Request, res: Response) => {
    const { error, value } = ProductValidator.fullValidateCreatePayloadWithJoi(
      req.body
    )

    if (error) throw new JoiValidationError(error)

    const product = await ProductService.create(value, null)

    return res.status(201).send(product)
  }

  static createWithPartialZodValidation = async (
    req: Request,
    res: Response
  ) => {
    const validationResult =
      ProductValidator.partialValidateCreatePayloadWithZod(req.body)

    if (!validationResult.success) {
      throw new ZodValidationError(validationResult.error)
    }

    const product = await ProductService.create(validationResult.data, null)

    return res.status(201).send(product)
  }

  static createWithFullZodValidation = async (req: Request, res: Response) => {
    const validationResult = ProductValidator.fullValidateCreatePayloadWithZod(
      req.body
    )

    if (!validationResult.success) {
      throw new ZodValidationError(validationResult.error)
    }

    const product = await ProductService.create(validationResult.data, null)

    return res.status(201).send(product)
  }
}
