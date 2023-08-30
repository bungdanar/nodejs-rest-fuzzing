import { JoiSchemaUtility } from '../../utils/joi-schema'

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
}
