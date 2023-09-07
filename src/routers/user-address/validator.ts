import { JoiSchemaUtility } from '../../utils/joi-schema'
import { ZodSchemaUtility } from '../../utils/zod-schema'

export class UserAddrValidator {
  static partialValidateCreatePayloadWithJoi = (payload: any) => {
    return JoiSchemaUtility.userAddrCreatePartialJoiValidationSchema.validate(
      payload
    )
  }

  static fullValidateCreatePayloadWithJoi = (payload: any) => {
    return JoiSchemaUtility.userAddrCreateFullJoiValidationSchema.validate(
      payload
    )
  }

  static partialValidateCreatePayloadWithZod = (payload: any) => {
    const schema = ZodSchemaUtility.userAddrCreatePartialZodValidationSchema()
    return schema.safeParse(payload)
  }

  static fullValidateCreatePayloadWithZod = (payload: any) => {
    const schema = ZodSchemaUtility.userAddrCreateFullZodValidationSchema()
    return schema.safeParse(payload)
  }
}
