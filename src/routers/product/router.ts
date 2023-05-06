import express from 'express'
import { ProductController } from './controller'

const router = express.Router()

router.get('/', ProductController.getAll)
router.post('/', ProductController.create)
router.patch('/:id', ProductController.update)

export { router as productRouter }
