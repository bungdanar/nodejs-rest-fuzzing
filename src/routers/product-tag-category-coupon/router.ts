import express from 'express'
import { ProductTagCategoryCouponController } from './controller'
import { Environment } from '../../utils/environment'
import { VALIDATION_MODE } from '../../data-type/validation-mode'

const router = express.Router()

switch (Environment.APP_ENV.VALIDATION) {
  case VALIDATION_MODE.JOI_PARTIAL: {
    router.post(
      '/',
      ProductTagCategoryCouponController.createWithPartialJoiValidation
    )
    break
  }

  case VALIDATION_MODE.JOI_FULL: {
    router.post(
      '/',
      ProductTagCategoryCouponController.createWithFullJoiValidation
    )
    break
  }

  case VALIDATION_MODE.ZOD_PARTIAL: {
    router.post(
      '/',
      ProductTagCategoryCouponController.createWithPartialZodValidation
    )
    break
  }

  case VALIDATION_MODE.ZOD_FULL: {
    router.post(
      '/',
      ProductTagCategoryCouponController.createWithFullZodValidation
    )
    break
  }

  default: {
    router.post('/', ProductTagCategoryCouponController.create)
    break
  }
}

export { router as productTagCategoryCouponRouter }
