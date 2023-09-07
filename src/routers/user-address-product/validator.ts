import { JoiSchemaUtility } from '../../utils/joi-schema'
import { ZodSchemaUtility } from '../../utils/zod-schema'

export class UserAddrProdValidator {
  static partialValidateCreatePayloadWithJoi = (payload: any) => {
    return JoiSchemaUtility.userAddrProdCreatePartialJoiValidationSchema.validate(
      payload
    )
  }

  static fullValidateCreatePayloadWithJoi = (payload: any) => {
    return JoiSchemaUtility.userAddrProdCreateFullJoiValidationSchema.validate(
      payload
    )
  }

  static partialValidateCreatePayloadWithZod = (payload: any) => {
    const schema =
      ZodSchemaUtility.userAddrProdCreatePartialZodValidationSchema()
    return schema.safeParse(payload)
  }

  static fullValidateCreatePayloadWithZod = (payload: any) => {
    const schema = ZodSchemaUtility.userAddrProdCreateFullZodValidationSchema()
    return schema.safeParse(payload)
  }
}
