import { Request, Response } from 'express'
import { Database } from '../../utils/database'
import { ProductService } from '../../utils/product-service'
import { ProductTagCategoryValidator } from './validator'
import { JoiValidationError } from '../../errors/joi-validation-err'
import { ZodValidationError } from '../../errors/zod-validation-err'

export class ProductTagCategoryController {
  static create = async (req: Request, res: Response) => {
    const transaction = await Database.getTransaction()

    try {
      const createdProduct = await ProductService.createWithTagCategory(
        req.body,
        transaction
      )

      await transaction.commit()
      return res.status(201).send(createdProduct)
    } catch (error) {
      await transaction.rollback()
      throw error
    }
  }

  static createWithPartialJoiValidation = async (
    req: Request,
    res: Response
  ) => {
    const { error, value } =
      ProductTagCategoryValidator.partialValidateCreatePayloadWithJoi(req.body)

    if (error) throw new JoiValidationError(error)

    const transaction = await Database.getTransaction()
    try {
      const product = await ProductService.createWithTagCategory(
        value,
        transaction
      )

      await transaction.commit()
      return res.status(201).send(product)
    } catch (error) {
      await transaction.rollback()
      throw error
    }
  }

  static createWithFullJoiValidation = async (req: Request, res: Response) => {
    const { error, value } =
      ProductTagCategoryValidator.fullValidateCreatePayloadWithJoi(req.body)

    if (error) throw new JoiValidationError(error)

    const transaction = await Database.getTransaction()
    try {
      const product = await ProductService.createWithTagCategory(
        value,
        transaction
      )

      await transaction.commit()
      return res.status(201).send(product)
    } catch (error) {
      await transaction.rollback()
      throw error
    }
  }

  static createWithPartialZodValidation = async (
    req: Request,
    res: Response
  ) => {
    const validationResult =
      ProductTagCategoryValidator.partialValidateCreatePayloadWithZod(req.body)

    if (!validationResult.success)
      throw new ZodValidationError(validationResult.error)

    const transaction = await Database.getTransaction()
    try {
      const product = await ProductService.createWithTagCategory(
        validationResult.data,
        transaction
      )

      await transaction.commit()
      return res.status(201).send(product)
    } catch (error) {
      await transaction.rollback()
      throw error
    }
  }

  static createWithFullZodValidation = async (req: Request, res: Response) => {
    const validationResult =
      await ProductTagCategoryValidator.fullValidateCreatePayloadWithZod(
        req.body
      )

    if (!validationResult.success)
      throw new ZodValidationError(validationResult.error)

    const transaction = await Database.getTransaction()
    try {
      const product = await ProductService.createWithTagCategory(
        validationResult.data,
        transaction
      )

      await transaction.commit()
      return res.status(201).send(product)
    } catch (error) {
      await transaction.rollback()
      throw error
    }
  }
}
