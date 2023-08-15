import express from 'express'
import 'express-async-errors'
import { json } from 'body-parser'
import cors from 'cors'
import { errHandler } from './middlewares/err-handler'
import { productRouter } from './routers/product/router'
import { productTagCategoryRouter } from './routers/product-tag-category/router'

const app = express()
app.use(
  cors({
    origin: '*',
  })
)
app.use(json())

app.use('/api/product', productRouter)
app.use('/api/product-tag-category', productTagCategoryRouter)

app.use(errHandler)

export { app }
