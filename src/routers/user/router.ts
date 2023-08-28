import express from 'express'
import { UserController } from './controller'

const router = express.Router()

router.post('/', UserController.create)

export { router as userRouter }
