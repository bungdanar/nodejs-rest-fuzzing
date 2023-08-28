import express from 'express'
import 'express-async-errors'
import responseTime from 'response-time'
import { json } from 'body-parser'
import cors from 'cors'
import { errHandler } from './middlewares/err-handler'
import { productRouter } from './routers/product/router'
import { productTagCategoryRouter } from './routers/product-tag-category/router'
import { productTagCategoryCouponRouter } from './routers/product-tag-category-coupon/router'
import { resTime } from './middlewares/res-time'
import { userRouter } from './routers/user/router'
import { userAddressRouter } from './routers/user-address/router'

const app = express()
app.use(responseTime())
app.use(
  cors({
    origin: '*',
  })
)
app.use(json())
app.use(resTime)

app.use('/api/product', productRouter)
app.use('/api/product-tag-category', productTagCategoryRouter)
app.use('/api/product-tag-category-coupon', productTagCategoryCouponRouter)
app.use('/api/user', userRouter)
app.use('/api/user-address', userAddressRouter)

app.use(errHandler)

export { app }
