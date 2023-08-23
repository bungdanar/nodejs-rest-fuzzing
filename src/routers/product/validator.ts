import Joi from 'joi'
import { ProductCreatePayload } from '../../data-type/product'
import { z } from 'zod'

export class ProductValidator {
  static partialValidateCreatePayloadWithJoi = (payload: any) => {
    const schema = Joi.object<ProductCreatePayload>({
      name: Joi.string().required(),
      sku: Joi.string().required(),
      regular_price: Joi.number().required(),
      discount_price: Joi.number().required(),
      quantity: Joi.number().integer().required(),
      description: Joi.string().required(),
      weight: Joi.number().required(),
      note: Joi.string().required(),
      published: Joi.boolean(),
    })

    return schema.validate(payload)
  }

  static fullValidateCreatePayloadWithJoi = (payload: any) => {
    const schema = Joi.object<ProductCreatePayload>({
      name: Joi.string().min(3).max(255).required(),
      sku: Joi.string().min(3).max(255).required(),
      regular_price: Joi.number().precision(4).min(0).required(),
      discount_price: Joi.number()
        .precision(4)
        .min(0)
        .max(Joi.ref('regular_price'))
        .required(),
      quantity: Joi.number().integer().min(0).max(9999).required(),
      description: Joi.string().min(3).max(1000).required(),
      weight: Joi.number().precision(4).min(0).max(1000).required(),
      note: Joi.string().min(3).max(255).required(),
      published: Joi.boolean(),
    })

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
      })
      .refine((data) => data.discount_price <= data.regular_price, {
        path: ['discount_price'],
        message: 'Must be less than or equal to regular_price',
      })

    return schema.safeParse(payload)
  }
}
