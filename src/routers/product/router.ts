import express from 'express'
import { ProductController } from './controller'

const router = express.Router()

router.get('/', ProductController.getAll)
router.get('/joi/lv1', ProductController.getAllWithJoiValidationLv1)
router.get('/joi/lv2', ProductController.getAllWithJoiValidationLv2)

router.post('/', ProductController.create)
router.post('/joi/lv1', ProductController.createWithJoiValidationLv1)
router.post('/joi/lv2', ProductController.createWithJoiValidationLv2)

router.patch('/:id', ProductController.update)

export { router as productRouter }
