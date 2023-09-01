import { NextFunction, Request, Response } from 'express'
import { CustomError } from '../errors/custom-err'
import { getErrorMessage } from '../utils/get-err-message'
import { err500Logger } from '../utils/logger'
import { Environment } from '../utils/environment'

export const errHandler = (
  err: unknown,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // Should be checked againts custom errors
  if (err instanceof CustomError) {
    return res.status(err.statusCode).send(err.serializeError())
  }

  // Pass all custom errors
  // Should log to logging service
  // console.error(getErrorMessage(err))
  const errMsg = getErrorMessage(err)
  const statusCode = 500

  console.log('\x1b[31m%s\x1b[0m', errMsg)
  err500Logger.info(
    `#${req.method}#${req.originalUrl}#${statusCode}#validation=${Environment.APP_ENV.VALIDATION}#msg=${errMsg}`
  )

  return res.status(statusCode).send({
    message: errMsg,
    statusCode,
  })
}
