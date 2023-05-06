import express from 'express'
import 'express-async-errors'
import { json } from 'body-parser'
import cors from 'cors'
import { errHandler } from './middlewares/err-handler'
import { productRouter } from './routers/product/router'

const app = express()
app.use(
  cors({
    origin: '*',
  })
)
app.use(json())

app.use('/api/example', productRouter)

app.use(errHandler)

export { app }
