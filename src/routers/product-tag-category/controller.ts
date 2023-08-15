import { Request, Response } from 'express'
import { ProductTagCategoryCreatePayload } from '../../data-type/product'
import { Database } from '../../utils/database'
import { Product } from '../../models/init-models'

export class ProductTagCategoryController {
  static create = async (req: Request, res: Response) => {
    const {
      tags: tagsPayload,
      category: categoryPayload,
      ...productPayload
    } = req.body as ProductTagCategoryCreatePayload

    const transaction = await Database.getTransaction()
    try {
      // Create product
      const createdProduct = await Product.create(
        {
          ...productPayload,
          // @ts-ignore
          tags: tagsPayload.map((t) => ({ name: t })),
          // @ts-ignore
          categories: [categoryPayload],
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
