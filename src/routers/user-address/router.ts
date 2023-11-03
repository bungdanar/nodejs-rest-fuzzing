import express from 'express'
import { UserAddressController } from './controller'
import { Environment } from '../../utils/environment'
import { VALIDATION_MODE } from '../../data-type/validation-mode'

const router = express.Router()

switch (Environment.APP_ENV.VALIDATION) {
  case VALIDATION_MODE.JOI_LOW: {
    router.post('/', UserAddressController.createWithPartialJoiValidation)
    break
  }

  case VALIDATION_MODE.JOI_MEDIUM: {
    router.post('/', UserAddressController.createWithFullJoiValidation)
    break
  }

  case VALIDATION_MODE.ZOD_LOW: {
    router.post('/', UserAddressController.createWithPartialZodValidation)
    break
  }

  case VALIDATION_MODE.ZOD_MEDIUM: {
    router.post('/', UserAddressController.createWithFullZodValidation)
    break
  }

  default: {
    router.post('/', UserAddressController.create)
    break
  }
}

export { router as userAddressRouter }
