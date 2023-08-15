import express from 'express'
import { ProductController } from './controller'

const router = express.Router()

router.post('/', ProductController.create)

export { router as productRouter }
