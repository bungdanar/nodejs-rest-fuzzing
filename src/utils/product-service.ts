import { Transaction } from 'sequelize'
import {
  ProductCreatePayload,
  ProductTagCategoryCouponCreatePayload,
  ProductTagCategoryCreatePayload,
} from '../data-type/product'
import { Product } from '../models/init-models'

export class ProductService {
  static create = async (
    payload: ProductCreatePayload,
    transaction: Transaction | null | undefined
  ): Promise<Product> => {
    return await Product.create(payload, { transaction })
  }

  static createWithTagCategory = async (
    payload: ProductTagCategoryCreatePayload,
    transaction: Transaction | null | undefined
  ): Promise<Product> => {
    const {
      tags: tagsPayload,
      category: categoryPayload,
      ...productPayload
    } = payload

    return await Product.create(
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
  }

  static createWithTagCategoryCoupon = async (
    payload: ProductTagCategoryCouponCreatePayload,
    transaction: Transaction | null | undefined
  ): Promise<Product> => {
    const {
      tags: tagsPayload,
      categories: categoriesPayload,
      coupons: couponsPayload,
      ...productPayload
    } = payload

    return await Product.create(
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
  }
}
