import express from 'express'
import { ProductTagCategoryController } from './controller'

const router = express.Router()

router.post('/', ProductTagCategoryController.create)

export { router as productTagCategoryRouter }
