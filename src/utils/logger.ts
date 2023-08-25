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

export const resTimeWithReqBodyLogger = winston.createLogger({
  level: 'info',
  format: winston.format.simple(),
  transports: [
    new winston.transports.File({
      filename: 'logs/res-time-with-req-body.log',
    }),
  ],
})
