import { JoiSchemaUtility } from '../../utils/joi-schema'
import { ZodSchemaUtility } from '../../utils/zod-schema'

export class UserValidator {
  static partialValidateCreatePayloadWithJoi = (payload: any) => {
    return JoiSchemaUtility.userCreatePartialJoiValidationSchema.validate(
      payload
    )
  }

  static fullValidateCreatePayloadWithJoi = (payload: any) => {
    return JoiSchemaUtility.userCreateFullJoiValidationSchema.validate(payload)
  }

  static partialValidateCreatePayloadWithZod = (payload: any) => {
    const schema = ZodSchemaUtility.userCreatePartialZodValidationSchema
    return schema.safeParse(payload)
  }

  static fullValidateCreatePayloadWithZod = async (payload: any) => {
    const schema = ZodSchemaUtility.userCreateFullZodValidationSchema
    return await schema.safeParseAsync(payload)
  }
}
