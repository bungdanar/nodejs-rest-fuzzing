import { Request, Response } from 'express'
import { Database } from '../../utils/database'
import { ProductService } from '../../utils/product-service'
import { ProductTagCategoryCouponValidator } from './validator'
import { JoiValidationError } from '../../errors/joi-validation-err'

export class ProductTagCategoryCouponController {
  static create = async (req: Request, res: Response) => {
    const transaction = await Database.getTransaction()

    try {
      const createdProduct = await ProductService.createWithTagCategoryCoupon(
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
      ProductTagCategoryCouponValidator.partialValidateCreatePayloadWithJoi(
        req.body
      )

    if (error) throw new JoiValidationError(error)

    const transaction = await Database.getTransaction()
    try {
      const product = await ProductService.createWithTagCategoryCoupon(
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
      ProductTagCategoryCouponValidator.fullValidateCreatePayloadWithJoi(
        req.body
      )

    if (error) throw new JoiValidationError(error)

    const transaction = await Database.getTransaction()
    try {
      const product = await ProductService.createWithTagCategoryCoupon(
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
}
