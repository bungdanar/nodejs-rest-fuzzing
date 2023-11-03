import express from 'express'
import { ProductTagCategoryController } from './controller'
import { Environment } from '../../utils/environment'
import { VALIDATION_MODE } from '../../data-type/validation-mode'

const router = express.Router()

switch (Environment.APP_ENV.VALIDATION) {
  case VALIDATION_MODE.JOI_LOW: {
    router.post(
      '/',
      ProductTagCategoryController.createWithPartialJoiValidation
    )
    break
  }

  case VALIDATION_MODE.JOI_MEDIUM: {
    router.post('/', ProductTagCategoryController.createWithFullJoiValidation)
    break
  }

  case VALIDATION_MODE.JOI_HIGH: {
    router.post('/', ProductTagCategoryController.createWithFullJoiValidation)
    break
  }

  case VALIDATION_MODE.ZOD_LOW: {
    router.post(
      '/',
      ProductTagCategoryController.createWithPartialZodValidation
    )
    break
  }

  case VALIDATION_MODE.ZOD_MEDIUM: {
    router.post('/', ProductTagCategoryController.createWithFullZodValidation)
    break
  }

  case VALIDATION_MODE.ZOD_HIGH: {
    router.post('/', ProductTagCategoryController.createWithFullZodValidation)
    break
  }

  default: {
    router.post('/', ProductTagCategoryController.create)
    break
  }
}

export { router as productTagCategoryRouter }
