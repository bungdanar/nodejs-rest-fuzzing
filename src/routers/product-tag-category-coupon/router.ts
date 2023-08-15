import express from 'express'
import { ProductTagCategoryCouponController } from './controller'

const router = express.Router()

router.post('/', ProductTagCategoryCouponController.create)

export { router as productTagCategoryCouponRouter }
