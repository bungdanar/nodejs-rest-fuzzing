import { JoiSchemaUtility } from '../../utils/joi-schema'

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
}
