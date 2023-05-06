import express from 'express'
import { ProductController } from './controller'

const router = express.Router()

router.get('/user', ProductController.getProduct)

export { router as productRouter }
