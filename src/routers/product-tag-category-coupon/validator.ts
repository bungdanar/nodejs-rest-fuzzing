import Joi from 'joi'
import {
  CategoryCreatePayload,
  CouponCreatePayload,
  ProductTagCategoryCouponCreatePayload,
} from '../../data-type/product'

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
      name: Joi.string().max(255).required(),
      sku: Joi.string().max(255).required(),
      regular_price: Joi.number().precision(4).min(0).required(),
      discount_price: Joi.number()
        .precision(4)
        .min(0)
        .max(Joi.ref('regular_price'))
        .required(),
      quantity: Joi.number().integer().min(0).max(9999).required(),
      description: Joi.string().max(1000).required(),
      weight: Joi.number().precision(4).min(0).max(1000).required(),
      note: Joi.string().max(255).required(),
      published: Joi.boolean(),
      tags: Joi.array().items(Joi.string().max(255).required()).required(),
      categories: Joi.array()
        .items(
          Joi.object<CategoryCreatePayload>({
            name: Joi.string().max(255).required(),
            description: Joi.string().max(1000).required(),
          }).required()
        )
        .required(),
      coupons: Joi.array()
        .items(
          Joi.object<CouponCreatePayload>({
            code: Joi.string().max(255).required(),
            description: Joi.string().max(1000).required(),
            discount_value: Joi.number()
              .precision(2)
              .min(0)
              .max(100)
              .required(),
            discount_type: Joi.string().max(255).required(),
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
}
