import { Request, Response } from 'express'
import { ProductTagCategoryCouponCreatePayload } from '../../data-type/product'
import { Database } from '../../utils/database'
import { Product } from '../../models/product'

export class ProductTagCategoryCouponController {
  static create = async (req: Request, res: Response) => {
    const {
      tags: tagsPayload,
      categories: categoriesPayload,
      coupons: couponsPayload,
      ...productPayload
    } = req.body as ProductTagCategoryCouponCreatePayload

    const transaction = await Database.getTransaction()
    try {
      // Create product
      const createdProduct = await Product.create(
        {
          ...productPayload,
          // @ts-ignore
          tags: tagsPayload.map((t) => ({ name: t })),
          // @ts-ignore
          categories: categoriesPayload,
          // @ts-ignore
          coupons: couponsPayload,
        },
        {
          transaction,
          include: [
            {
              association: Product.associations.tags,
            },
            {
              association: Product.associations.categories,
            },
            {
              association: Product.associations.coupons,
            },
          ],
        }
      )

      await transaction.commit()
      return res.status(201).send(createdProduct)
    } catch (error) {
      await transaction.rollback()
      throw error
    }
  }
}
