import express from 'express'
import { UserAddressProductShippingController } from './controller'
import { Environment } from '../../utils/environment'
import { VALIDATION_MODE } from '../../data-type/validation-mode'

const router = express.Router()

switch (Environment.APP_ENV.VALIDATION) {
  case VALIDATION_MODE.JOI_LOW: {
    router.post(
      '/',
      UserAddressProductShippingController.createWithPartialJoiValidation
    )
    break
  }

  case VALIDATION_MODE.JOI_MEDIUM: {
    router.post(
      '/',
      UserAddressProductShippingController.createWithFullJoiValidation
    )
    break
  }

  case VALIDATION_MODE.ZOD_LOW: {
    router.post(
      '/',
      UserAddressProductShippingController.createWithPartialZodValidation
    )
    break
  }

  case VALIDATION_MODE.ZOD_MEDIUM: {
    router.post(
      '/',
      UserAddressProductShippingController.createWithFullZodValidation
    )
    break
  }

  default: {
    router.post('/', UserAddressProductShippingController.create)
    break
  }
}

export { router as userAddressProductShippingRouter }
