import Joi from 'joi'
import { ProductTagCategoryCreatePayload } from '../../data-type/product'
import { z } from 'zod'
import { JoiSchemaUtility } from '../../utils/joi-schema'

export class ProductTagCategoryValidator {
  static partialValidateCreatePayloadWithJoi = (payload: any) => {
    const schema = Joi.object<ProductTagCategoryCreatePayload>({
      tags: JoiSchemaUtility.tagCreatePartialJoiValidationSchema(),
      category: JoiSchemaUtility.categoryCreatePartialJoiValidationSchema(),
      // @ts-ignore
    }).concat(JoiSchemaUtility.productCreatePartialJoiValidationSchema())

    return schema.validate(payload)
  }

  static fullValidateCreatePayloadWithJoi = (payload: any) => {
    const schema = Joi.object<ProductTagCategoryCreatePayload>({
      tags: JoiSchemaUtility.tagCreateFullJoiValidationSchema(),
      category: JoiSchemaUtility.categoryCreateFullJoiValidationSchema(),
      // @ts-ignore
    }).concat(JoiSchemaUtility.productCreateFullJoiValidationSchema())

    return schema.validate(payload)
  }

  static partialValidateCreatePayloadWithZod = (payload: any) => {
    const schema = z.object({
      name: z.string(),
      sku: z.string(),
      regular_price: z.coerce.number(),
      discount_price: z.coerce.number(),
      quantity: z.coerce.number().int(),
      description: z.string(),
      weight: z.coerce.number(),
      note: z.string(),
      published: z.coerce.boolean().optional(),
      tags: z.array(z.string()).nonempty(),
      category: z.object({
        name: z.string(),
        description: z.string(),
      }),
    })

    return schema.safeParse(payload)
  }

  static fullValidateCreatePayloadWithZod = (payload: any) => {
    const schema = z
      .object({
        name: z.string().min(3).max(255),
        sku: z.string().min(3).max(255),
        regular_price: z.coerce.number().nonnegative(),
        discount_price: z.coerce.number().nonnegative(),
        quantity: z.coerce.number().int().nonnegative().lte(9999),
        description: z.string().min(3).max(1000),
        weight: z.coerce.number().nonnegative().lte(1000),
        note: z.string().min(3).max(255),
        published: z.coerce.boolean().optional(),
        tags: z.array(z.string().min(3).max(255)).nonempty(),
        category: z.object({
          name: z.string().min(3).max(255),
          description: z.string().min(3).max(1000),
        }),
      })
      .refine((data) => data.discount_price <= data.regular_price, {
        path: ['discount_price'],
        message: 'Must be less than or equal to regular_price',
      })

    return schema.safeParse(payload)
  }
}
