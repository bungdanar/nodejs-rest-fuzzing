import Joi from 'joi'
import {
  CategoryCreatePayload,
  ProductTagCategoryCreatePayload,
} from '../../data-type/product'

export class ProductTagCategoryValidator {
  static partialValidateCreatePayloadWithJoi = (payload: any) => {
    const schema = Joi.object<ProductTagCategoryCreatePayload>({
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
      category: Joi.object<CategoryCreatePayload>({
        name: Joi.string().required(),
        description: Joi.string().required(),
      }).required(),
    })

    return schema.validate(payload)
  }

  static fullValidateCreatePayloadWithJoi = (payload: any) => {
    const schema = Joi.object<ProductTagCategoryCreatePayload>({
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
      category: Joi.object<CategoryCreatePayload>({
        name: Joi.string().max(255).required(),
        description: Joi.string().max(1000).required(),
      }).required(),
    })

    return schema.validate(payload)
  }
}
