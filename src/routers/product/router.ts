import express from 'express'
import { ProductController } from './controller'
import { Environment } from '../../utils/environment'
import { VALIDATION_MODE } from '../../data-type/validation-mode'

const router = express.Router()

switch (Environment.APP_ENV.VALIDATION) {
  case VALIDATION_MODE.JOI_PARTIAL: {
    router.post('/', ProductController.createWithPartialJoiValidation)
    break
  }

  case VALIDATION_MODE.JOI_FULL: {
    router.post('/', ProductController.createWithFullJoiValidation)
    break
  }

  case VALIDATION_MODE.ZOD_PARTIAL: {
    router.post('/', ProductController.createWithPartialZodValidation)
    break
  }

  case VALIDATION_MODE.ZOD_FULL: {
    router.post('/', ProductController.createWithFullZodValidation)
    break
  }

  default: {
    router.post('/', ProductController.create)
    break
  }
}

export { router as productRouter }
