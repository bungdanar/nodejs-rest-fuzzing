import { JoiSchemaUtility } from '../../utils/joi-schema'
import { ZodSchemaUtility } from '../../utils/zod-schema'

export class UserAddrProdShipValidator {
  static partialValidateCreatePayloadWithJoi = (payload: any) => {
    return JoiSchemaUtility.userAddrProdShipCreatePartialJoiValidationSchema.validate(
      payload
    )
  }

  static fullValidateCreatePayloadWithJoi = (payload: any) => {
    return JoiSchemaUtility.userAddrProdShipCreateFullJoiValidationSchema.validate(
      payload
    )
  }

  static partialValidateCreatePayloadWithZod = (payload: any) => {
    const schema =
      ZodSchemaUtility.userAddrProdShipCreatePartialZodValidationSchema
    return schema.safeParse(payload)
  }

  static fullValidateCreatePayloadWithZod = async (payload: any) => {
    const schema =
      ZodSchemaUtility.userAddrProdShipCreateFullZodValidationSchema
    return await schema.safeParseAsync(payload)
  }
}
