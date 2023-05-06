import { app } from './app'

const LISTENING_PORT = 5000

app.listen(LISTENING_PORT, () => {
  console.log(
    `⚡️[server]: Server is running at https://localhost:${LISTENING_PORT}`
  )
})
