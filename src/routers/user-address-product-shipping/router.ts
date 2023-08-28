import express from 'express'
import { UserAddressProductShippingController } from './controller'

const router = express.Router()

router.post('/', UserAddressProductShippingController.create)

export { router as userAddressProductShippingRouter }
