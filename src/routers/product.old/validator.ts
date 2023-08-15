import { product } from '@prisma/client'
import Joi from 'joi'

export class ProductValidator {
  static validateGetAllQueryWithJoiValidationLv1 = (query: any) => {
    const schema = Joi.object<product>({
      id: Joi.number().integer(),
      name: Joi.string(),
      sku: Joi.string(),
      regular_price: Joi.number(),
      discount_price: Joi.number(),
      quantity: Joi.number().integer(),
      description: Joi.string(),
      weight: Joi.number(),
      note: Joi.string(),
      published: Joi.boolean(),
      created_at: Joi.date().iso(),
    })

    return schema.validate(query)
  }

  static validateGetAllQueryWithJoiValidationLv2 = (query: any) => {
    const schema = Joi.object<product>({
      id: Joi.number().integer(),
      name: Joi.string().min(1).max(255),
      sku: Joi.string().min(1).max(255),
      regular_price: Joi.number().min(0),
      discount_price: Joi.number().min(0),
      quantity: Joi.number().integer().min(0),
      description: Joi.string().min(1).max(1000),
      weight: Joi.number().min(0),
      note: Joi.string().min(1).max(255),
      published: Joi.boolean(),
      created_at: Joi.date().iso(),
    })

    return schema.validate(query)
  }

  static validateCreatePayloadWithJoiValidationLv1 = (payload: any) => {
    const schema = Joi.object<product>({
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

  static validateCreatePayloadWithJoiValidationLv2 = (payload: any) => {
    const schema = Joi.object<product>({
      name: Joi.string().min(3).max(255).required(),
      sku: Joi.string().min(3).max(255).required(),
      regular_price: Joi.number().precision(4).min(0).required(),
      discount_price: Joi.number().precision(4).min(0).required(),
      quantity: Joi.number().integer().min(0).required(),
      description: Joi.string().min(3).max(1000).required(),
      weight: Joi.number().min(0).required(),
      note: Joi.string().min(3).max(255).required(),
      published: Joi.boolean(),
    })

    return schema.validate(payload)
  }
}
