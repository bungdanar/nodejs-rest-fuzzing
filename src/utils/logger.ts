import winston from 'winston'

export const resTimeLogger = winston.createLogger({
  level: 'info',
  format: winston.format.simple(),
  transports: [
    new winston.transports.File({
      filename: 'logs/res-time.log',
    }),
  ],
})

export const err500Logger = winston.createLogger({
  level: 'info',
  format: winston.format.simple(),
  transports: [
    new winston.transports.File({
      filename: 'logs/err500.log',
    }),
  ],
})
