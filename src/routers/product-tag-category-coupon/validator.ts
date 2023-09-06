import { JoiSchemaUtility } from '../../utils/joi-schema'
import { ZodSchemaUtility } from '../../utils/zod-schema'

export class ProductTagCategoryCouponValidator {
  static partialValidateCreatePayloadWithJoi = (payload: any) => {
    const schema =
      JoiSchemaUtility.productTagCategoryCouponCreatePartialJoiValidationSchema

    return schema.validate(payload)
  }

  static fullValidateCreatePayloadWithJoi = (payload: any) => {
    const schema =
      JoiSchemaUtility.productTagCategoryCouponCreateFullJoiValidationSchema

    return schema.validate(payload)
  }

  static partialValidateCreatePayloadWithZod = (payload: any) => {
    const schema =
      ZodSchemaUtility.productTagCategoryCouponCreatePartialZodValidationSchema

    return schema.safeParse(payload)
  }

  static fullValidateCreatePayloadWithZod = async (payload: any) => {
    const schema =
      ZodSchemaUtility.productTagCategoryCouponCreateFullZodValidationSchema

    return await schema.safeParseAsync(payload)
  }
}
