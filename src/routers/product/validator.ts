import { JoiSchemaUtility } from '../../utils/joi-schema'
import { ZodSchemaUtility } from '../../utils/zod-schema'

export class ProductValidator {
  static partialValidateCreatePayloadWithJoi = (payload: any) => {
    const schema = JoiSchemaUtility.productCreatePartialJoiValidationSchema
    return schema.validate(payload)
  }

  static fullValidateCreatePayloadWithJoi = (payload: any) => {
    const schema = JoiSchemaUtility.productCreateFullJoiValidationSchema
    return schema.validate(payload)
  }

  static partialValidateCreatePayloadWithZod = (payload: any) => {
    const schema = ZodSchemaUtility.productCreatePartialZodValidationSchema()
    return schema.safeParse(payload)
  }

  static fullValidateCreatePayloadWithZod = (payload: any) => {
    const schema =
      ZodSchemaUtility.productCreateFullZodValidationRefinedSchema()
    return schema.safeParse(payload)
  }
}
