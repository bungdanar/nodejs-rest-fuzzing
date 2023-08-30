import { JoiSchemaUtility } from '../../utils/joi-schema'

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
}
