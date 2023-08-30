import express from 'express'
import { UserAddressProductShippingController } from './controller'
import { Environment } from '../../utils/environment'
import { VALIDATION_MODE } from '../../data-type/validation-mode'

const router = express.Router()

switch (Environment.APP_ENV.VALIDATION) {
  case VALIDATION_MODE.JOI_PARTIAL: {
    router.post(
      '/',
      UserAddressProductShippingController.createWithPartialJoiValidation
    )
    break
  }

  case VALIDATION_MODE.JOI_FULL: {
    router.post(
      '/',
      UserAddressProductShippingController.createWithFullJoiValidation
    )
    break
  }

  case VALIDATION_MODE.ZOD_PARTIAL: {
    break
  }

  case VALIDATION_MODE.ZOD_FULL: {
    break
  }

  default: {
    router.post('/', UserAddressProductShippingController.create)
    break
  }
}

export { router as userAddressProductShippingRouter }
