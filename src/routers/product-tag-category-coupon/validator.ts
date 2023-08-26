import Joi from 'joi'
import { ProductTagCategoryCouponCreatePayload } from '../../data-type/product'
import { z } from 'zod'
import { JoiSchemaUtility } from '../../utils/joi-schema'

export class ProductTagCategoryCouponValidator {
  static partialValidateCreatePayloadWithJoi = (payload: any) => {
    const schema = Joi.object<ProductTagCategoryCouponCreatePayload>({
      tags: JoiSchemaUtility.tagCreatePartialJoiValidationSchema(),
      categories: Joi.array()
        .items(JoiSchemaUtility.categoryCreatePartialJoiValidationSchema())
        .required(),
      coupons: Joi.array()
        .items(JoiSchemaUtility.couponCreatePartialJoiValidationSchema())
        .required(),
      // @ts-ignore
    }).concat(JoiSchemaUtility.productCreatePartialJoiValidationSchema())

    return schema.validate(payload)
  }

  static fullValidateCreatePayloadWithJoi = (payload: any) => {
    const schema = Joi.object<ProductTagCategoryCouponCreatePayload>({
      tags: JoiSchemaUtility.tagCreateFullJoiValidationSchema(),
      categories: Joi.array()
        .items(JoiSchemaUtility.categoryCreateFullJoiValidationSchema())
        .required(),
      coupons: Joi.array()
        .items(JoiSchemaUtility.couponCreateFullJoiValidationSchema())
        .required(),
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
      categories: z
        .array(
          z.object({
            name: z.string(),
            description: z.string(),
          })
        )
        .nonempty(),
      coupons: z
        .array(
          z.object({
            code: z.string(),
            description: z.string(),
            discount_value: z.coerce.number(),
            discount_type: z.string(),
            times_used: z.coerce.number().int().optional(),
            max_usage: z.coerce.number().int(),
            start_date: z.coerce.date(),
            end_date: z.coerce.date(),
          })
        )
        .nonempty(),
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
        categories: z
          .array(
            z.object({
              name: z.string().min(3).max(255),
              description: z.string().min(3).max(1000),
            })
          )
          .nonempty(),
        coupons: z
          .array(
            z
              .object({
                code: z.string().min(3).max(255),
                description: z.string().min(3).max(1000),
                discount_value: z.coerce.number().nonnegative().lte(100),
                discount_type: z.string().min(3).max(255),
                times_used: z.coerce.number().int().nonnegative().optional(),
                max_usage: z.coerce.number().int().nonnegative(),
                start_date: z.coerce.date(),
                end_date: z.coerce.date(),
              })
              .refine(
                (data) => {
                  if (data.times_used) {
                    return data.times_used <= data.max_usage
                  } else {
                    return true
                  }
                },
                {
                  path: ['times_used'],
                  message: 'Must be less than or equal to max_usage',
                }
              )
              .refine((data) => data.end_date >= data.start_date, {
                path: ['end_date'],
                message: 'Must be greater than or equal to start_date',
              })
          )
          .nonempty(),
      })
      .refine((data) => data.discount_price <= data.regular_price, {
        path: ['discount_price'],
        message: 'Must be less than or equal to regular_price',
      })

    return schema.safeParse(payload)
  }
}
