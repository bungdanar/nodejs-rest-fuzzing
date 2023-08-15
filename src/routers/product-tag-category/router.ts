import express from 'express'
import { ProductTagCategoryController } from './controller'
import { Environment } from '../../utils/environment'
import { VALIDATION_MODE } from '../../data-type/validation-mode'

const router = express.Router()

switch (Environment.APP_ENV.VALIDATION) {
  case VALIDATION_MODE.JOI_PARTIAL: {
    router.post(
      '/',
      ProductTagCategoryController.createWithPartialJoiValidation
    )
    break
  }

  case VALIDATION_MODE.JOI_FULL: {
    router.post('/', ProductTagCategoryController.createWithFullJoiValidation)
    break
  }

  default: {
    router.post('/', ProductTagCategoryController.create)
    break
  }
}

export { router as productTagCategoryRouter }
