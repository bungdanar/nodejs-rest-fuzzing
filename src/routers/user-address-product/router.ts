import express from 'express'
import { UserAddressProductController } from './controller'
import { Environment } from '../../utils/environment'
import { VALIDATION_MODE } from '../../data-type/validation-mode'

const router = express.Router()

switch (Environment.APP_ENV.VALIDATION) {
  case VALIDATION_MODE.JOI_LOW: {
    router.post(
      '/',
      UserAddressProductController.createWithPartialJoiValidation
    )
    break
  }

  case VALIDATION_MODE.JOI_MEDIUM: {
    router.post('/', UserAddressProductController.createWithFullJoiValidation)
    break
  }

  case VALIDATION_MODE.JOI_HIGH: {
    router.post('/', UserAddressProductController.createWithFullJoiValidation)
    break
  }

  case VALIDATION_MODE.ZOD_LOW: {
    router.post(
      '/',
      UserAddressProductController.createWithPartialZodValidation
    )
    break
  }

  case VALIDATION_MODE.ZOD_MEDIUM: {
    router.post('/', UserAddressProductController.createWithFullZodValidation)
    break
  }

  case VALIDATION_MODE.ZOD_HIGH: {
    router.post('/', UserAddressProductController.createWithFullZodValidation)
    break
  }

  default: {
    router.post('/', UserAddressProductController.create)
    break
  }
}

export { router as userAddressProductRouter }
