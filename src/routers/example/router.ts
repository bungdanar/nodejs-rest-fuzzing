import express from 'express'
import { ExampleController } from './controller'

const router = express.Router()

router.get('/user', ExampleController.getUsers)

export { router as exampleRouter }
