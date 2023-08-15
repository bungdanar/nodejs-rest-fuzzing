import express from 'express'
import 'express-async-errors'
import { json } from 'body-parser'
import cors from 'cors'
import { errHandler } from './middlewares/err-handler'
import { productOldRouter } from './routers/product.old/router'
import { productRouter } from './routers/product/router'

const app = express()
app.use(
  cors({
    origin: '*',
  })
)
app.use(json())

app.use('/api/product', productRouter)
app.use('/api/productOld', productOldRouter)

app.use(errHandler)

export { app }
