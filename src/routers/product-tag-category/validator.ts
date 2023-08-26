import Joi from 'joi'
import { ProductTagCategoryCreatePayload } from '../../data-type/product'
import { JoiSchemaUtility } from '../../utils/joi-schema'
import { ZodSchemaUtility } from '../../utils/zod-schema'

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
    const schema =
      ZodSchemaUtility.productTagCategoryCreatePartialZodValidationSchema

    return schema.safeParse(payload)
  }

  static fullValidateCreatePayloadWithZod = (payload: any) => {
    const schema = ZodSchemaUtility.productTagCategoryFullZodValidationSchema

    return schema.safeParse(payload)
  }
}
