import Joi from 'joi'
import {
  CategoryCreatePayload,
  CouponCreatePayload,
  ProductTagCategoryCouponCreatePayload,
} from '../../data-type/product'
import { z } from 'zod'

export class ProductTagCategoryCouponValidator {
  static partialValidateCreatePayloadWithJoi = (payload: any) => {
    const schema = Joi.object<ProductTagCategoryCouponCreatePayload>({
      name: Joi.string().required(),
      sku: Joi.string().required(),
      regular_price: Joi.number().required(),
      discount_price: Joi.number().required(),
      quantity: Joi.number().integer().required(),
      description: Joi.string().required(),
      weight: Joi.number().required(),
      note: Joi.string().required(),
      published: Joi.boolean(),
      tags: Joi.array().items(Joi.string().required()).required(),
      categories: Joi.array()
        .items(
          Joi.object<CategoryCreatePayload>({
            name: Joi.string().required(),
            description: Joi.string().required(),
          }).required()
        )
        .required(),
      coupons: Joi.array()
        .items(
          Joi.object<CouponCreatePayload>({
            code: Joi.string().required(),
            description: Joi.string().required(),
            discount_value: Joi.number().required(),
            discount_type: Joi.string().required(),
            times_used: Joi.number().integer(),
            max_usage: Joi.number().integer().required(),
            start_date: Joi.date().iso().required(),
            end_date: Joi.date().iso().required(),
          }).required()
        )
        .required(),
    })

    return schema.validate(payload)
  }

  static fullValidateCreatePayloadWithJoi = (payload: any) => {
    const schema = Joi.object<ProductTagCategoryCouponCreatePayload>({
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
      tags: Joi.array()
        .items(Joi.string().min(3).max(255).required())
        .required(),
      categories: Joi.array()
        .items(
          Joi.object<CategoryCreatePayload>({
            name: Joi.string().min(3).max(255).required(),
            description: Joi.string().min(3).max(1000).required(),
          }).required()
        )
        .required(),
      coupons: Joi.array()
        .items(
          Joi.object<CouponCreatePayload>({
            code: Joi.string().min(3).max(255).required(),
            description: Joi.string().min(3).max(1000).required(),
            discount_value: Joi.number()
              .precision(2)
              .min(0)
              .max(100)
              .required(),
            discount_type: Joi.string().min(3).max(255).required(),
            times_used: Joi.number().integer().min(0).max(Joi.ref('max_usage')),
            max_usage: Joi.number().integer().min(0).required(),
            start_date: Joi.date().iso().required(),
            end_date: Joi.date().iso().min(Joi.ref('start_date')).required(),
          }).required()
        )
        .required(),
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
