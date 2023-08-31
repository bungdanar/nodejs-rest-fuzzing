import express from 'express'
import { UserAddressController } from './controller'
import { Environment } from '../../utils/environment'
import { VALIDATION_MODE } from '../../data-type/validation-mode'

const router = express.Router()

switch (Environment.APP_ENV.VALIDATION) {
  case VALIDATION_MODE.JOI_PARTIAL: {
    router.post('/', UserAddressController.createWithPartialJoiValidation)
    break
  }

  case VALIDATION_MODE.JOI_FULL: {
    router.post('/', UserAddressController.createWithFullJoiValidation)
    break
  }

  case VALIDATION_MODE.ZOD_PARTIAL: {
    router.post('/', UserAddressController.createWithPartialZodValidation)
    break
  }

  case VALIDATION_MODE.ZOD_FULL: {
    router.post('/', UserAddressController.createWithFullZodValidation)
    break
  }

  default: {
    router.post('/', UserAddressController.create)
    break
  }
}

export { router as userAddressRouter }
