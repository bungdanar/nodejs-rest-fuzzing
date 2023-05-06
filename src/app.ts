import express from 'express'
import 'express-async-errors'
import { json } from 'body-parser'
import cors from 'cors'

const app = express()
app.use(
  cors({
    origin: '*',
  })
)
app.use(json())

app.use('/', (req, res) => {
  return res.status(200).send('ok')
})

export { app }
