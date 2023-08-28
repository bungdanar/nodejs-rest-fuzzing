import express from 'express'
import { UserAddressProductController } from './controller'

const router = express.Router()

router.post('/', UserAddressProductController.create)

export { router as userAddressProductRouter }
