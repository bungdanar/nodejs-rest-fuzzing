import fs from 'fs/promises'

async function clearLog() {
  const logFile = 'logs/res-time.log'
  try {
    const fileExists = await fs
      .access(logFile)
      .then(() => true)
      .catch(() => false)

    if (fileExists) {
      await fs.unlink(logFile)
      console.log('Log file deleted successfully.')
    } else {
      console.log('log file does not exist.')
    }
  } catch (err) {
    console.error('Error deleting log file:', err)
  }
}

clearLog()
