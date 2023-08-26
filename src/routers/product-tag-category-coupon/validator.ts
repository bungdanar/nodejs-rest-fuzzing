import Joi from 'joi'
import { ProductTagCategoryCouponCreatePayload } from '../../data-type/product'
import { JoiSchemaUtility } from '../../utils/joi-schema'
import { ZodSchemaUtility } from '../../utils/zod-schema'

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
    const schema =
      ZodSchemaUtility.productTagCategoryCouponCreatePartialZodValidationSchema

    return schema.safeParse(payload)
  }

  static fullValidateCreatePayloadWithZod = (payload: any) => {
    const schema =
      ZodSchemaUtility.productTagCategoryCouponCreateFullZodValidationSchema

    return schema.safeParse(payload)
  }
}
