import express from 'express'
import { UserAddressProductController } from './controller'
import { Environment } from '../../utils/environment'
import { VALIDATION_MODE } from '../../data-type/validation-mode'

const router = express.Router()

switch (Environment.APP_ENV.VALIDATION) {
  case VALIDATION_MODE.JOI_PARTIAL: {
    router.post(
      '/',
      UserAddressProductController.createWithPartialJoiValidation
    )
    break
  }

  case VALIDATION_MODE.JOI_FULL: {
    router.post('/', UserAddressProductController.createWithFullJoiValidation)
    break
  }

  case VALIDATION_MODE.ZOD_PARTIAL: {
    router.post(
      '/',
      UserAddressProductController.createWithPartialZodValidation
    )
    break
  }

  case VALIDATION_MODE.ZOD_FULL: {
    router.post('/', UserAddressProductController.createWithFullZodValidation)
    break
  }

  default: {
    router.post('/', UserAddressProductController.create)
    break
  }
}

export { router as userAddressProductRouter }
