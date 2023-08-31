import express from 'express'
import { UserController } from './controller'
import { Environment } from '../../utils/environment'
import { VALIDATION_MODE } from '../../data-type/validation-mode'

const router = express.Router()

switch (Environment.APP_ENV.VALIDATION) {
  case VALIDATION_MODE.JOI_PARTIAL: {
    router.post('/', UserController.createWithPartialJoiValidation)
    break
  }

  case VALIDATION_MODE.JOI_FULL: {
    router.post('/', UserController.createWithFullJoiValidation)
    break
  }

  case VALIDATION_MODE.ZOD_PARTIAL: {
    router.post('/', UserController.createWithPartialZodValidation)
    break
  }

  case VALIDATION_MODE.ZOD_FULL: {
    router.post('/', UserController.createWithFullZodValidation)
    break
  }

  default: {
    router.post('/', UserController.create)
    break
  }
}

export { router as userRouter }
