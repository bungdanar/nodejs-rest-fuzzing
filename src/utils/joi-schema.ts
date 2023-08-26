import Joi from 'joi'
import {
  CategoryCreatePayload,
  CouponCreatePayload,
  ProductCreatePayload,
} from '../data-type/product'

export class JoiSchema {
  static productCreatePartialJoiValidationSchema = () =>
    Joi.object<ProductCreatePayload>({
      name: Joi.string().required(),
      sku: Joi.string().required(),
      regular_price: Joi.number().required(),
      discount_price: Joi.number().required(),
      quantity: Joi.number().integer().required(),
      description: Joi.string().required(),
      weight: Joi.number().required(),
      note: Joi.string().required(),
      published: Joi.boolean(),
    }).required()

  static tagCreatePartialJoiValidationSchema = () =>
    Joi.array().items(Joi.string().required()).required()

  static categoryCreatePartialJoiValidationSchema = () =>
    Joi.object<CategoryCreatePayload>({
      name: Joi.string().required(),
      description: Joi.string().required(),
    }).required()

  static couponCreatePartialJoiValidationSchema = () =>
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

  static productCreateFullJoiValidationSchema = () =>
    Joi.object<ProductCreatePayload>({
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
    }).required()

  static tagCreateFullJoiValidationSchema = () =>
    Joi.array().items(Joi.string().min(3).max(255).required()).required()

  static categoryCreateFullJoiValidationSchema = () =>
    Joi.object<CategoryCreatePayload>({
      name: Joi.string().min(3).max(255).required(),
      description: Joi.string().min(3).max(1000).required(),
    }).required()

  static couponCreateFullJoiValidationSchema = () =>
    Joi.object<CouponCreatePayload>({
      code: Joi.string().min(3).max(255).required(),
      description: Joi.string().min(3).max(1000).required(),
      discount_value: Joi.number().precision(2).min(0).max(100).required(),
      discount_type: Joi.string().min(3).max(255).required(),
      times_used: Joi.number().integer().min(0).max(Joi.ref('max_usage')),
      max_usage: Joi.number().integer().min(0).required(),
      start_date: Joi.date().iso().required(),
      end_date: Joi.date().iso().min(Joi.ref('start_date')).required(),
    }).required()
}
