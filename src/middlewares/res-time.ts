import { NextFunction, Request, Response } from 'express'
import { resTimeLogger } from '../utils/logger'
import { Environment } from '../utils/environment'

export const resTime = (req: Request, res: Response, next: NextFunction) => {
  res.on('finish', () => {
    const responseTime = res.getHeader('X-Response-Time')

    resTimeLogger.info(
      `${req.method} ${req.originalUrl} ${res.statusCode} ${responseTime} validation=${Environment.APP_ENV.VALIDATION}`
    )
  })

  next()
}
