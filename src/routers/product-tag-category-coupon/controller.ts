import { Request, Response } from 'express'
import { Database } from '../../utils/database'
import { ProductService } from '../../utils/product-service'

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
}
