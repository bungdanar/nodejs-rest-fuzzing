import { JoiSchemaUtility } from '../../utils/joi-schema'

export class UserValidator {
  static partialValidateCreatePayloadWithJoi = (payload: any) => {
    return JoiSchemaUtility.userCreatePartialJoiValidationSchema.validate(
      payload
    )
  }

  static fullValidateCreatePayloadWithJoi = (payload: any) => {
    return JoiSchemaUtility.userCreateFullJoiValidationSchema.validate(payload)
  }
}
