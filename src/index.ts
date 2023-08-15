import { app } from './app'
import { initModels } from './models/init-models'
import { Database } from './utils/database'
import { Environment } from './utils/environment'
import { getErrorMessage } from './utils/get-err-message'

const start = async () => {
  let LISTENING_PORT = 5000

  try {
    Environment.checkEnvVariables()

    // Reassign port
    LISTENING_PORT = parseInt(Environment.APP_ENV.PORT)

    // Test db connection
    await Database.context.authenticate()

    // Initiate all models and associations
    initModels(Database.context)
    console.log('Connected to database')

    console.log(`App has been lifted at ${new Date()}`)
  } catch (error) {
    console.error(getErrorMessage(error))
    process.exit(1)
  }

  app.listen(LISTENING_PORT, () => {
    console.log(
      `⚡️[server]: Server is running at https://localhost:${LISTENING_PORT}`
    )
  })
}

start()
