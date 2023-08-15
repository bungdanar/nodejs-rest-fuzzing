import Joi from 'joi'
import { ProductCreatePayload } from '../../data-type/product'

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
    })

    return schema.validate(payload)
  }
}
