import { JoiSchemaUtility } from '../../utils/joi-schema'
import { ZodSchemaUtility } from '../../utils/zod-schema'

export class ProductTagCategoryValidator {
  static partialValidateCreatePayloadWithJoi = (payload: any) => {
    const schema =
      JoiSchemaUtility.productTagCategoryCreatePartialJoiValidationSchema

    return schema.validate(payload)
  }

  static fullValidateCreatePayloadWithJoi = (payload: any) => {
    const schema =
      JoiSchemaUtility.productTagCategoryCreateFullJoiValidationSchema

    return schema.validate(payload)
  }

  static partialValidateCreatePayloadWithZod = (payload: any) => {
    const schema =
      ZodSchemaUtility.productTagCategoryCreatePartialZodValidationSchema()

    return schema.safeParse(payload)
  }

  static fullValidateCreatePayloadWithZod = (payload: any) => {
    const schema = ZodSchemaUtility.productTagCategoryFullZodValidationSchema()

    return schema.safeParse(payload)
  }
}
