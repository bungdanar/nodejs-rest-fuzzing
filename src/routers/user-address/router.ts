import express from 'express'
import { UserAddressController } from './controller'

const router = express.Router()

router.post('/', UserAddressController.create)

export { router as userAddressRouter }
