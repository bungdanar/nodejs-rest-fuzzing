import express from 'express'
import { ProductController } from './controller'
import { Environment } from '../../utils/environment'
import { VALIDATION_MODE } from '../../data-type/validation-mode'

const router = express.Router()

switch (Environment.APP_ENV.VALIDATION) {
  case VALIDATION_MODE.JOI_LOW: {
    router.post('/', ProductController.createWithPartialJoiValidation)
    break
  }

  case VALIDATION_MODE.JOI_MEDIUM: {
    router.post('/', ProductController.createWithPartialJoiValidation)
    break
  }

  case VALIDATION_MODE.JOI_HIGH: {
    router.post('/', ProductController.createWithFullJoiValidation)
    break
  }

  case VALIDATION_MODE.ZOD_LOW: {
    router.post('/', ProductController.createWithPartialZodValidation)
    break
  }

  case VALIDATION_MODE.ZOD_MEDIUM: {
    router.post('/', ProductController.createWithPartialZodValidation)
    break
  }

  case VALIDATION_MODE.ZOD_HIGH: {
    router.post('/', ProductController.createWithFullZodValidation)
    break
  }

  default: {
    router.post('/', ProductController.create)
    break
  }
}

export { router as productRouter }
