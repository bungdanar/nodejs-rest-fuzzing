import { NextFunction, Request, Response } from 'express'
import { BaseError as SequelizeBaseError } from 'sequelize'
import { CustomError } from '../errors/custom-err'
import { getErrorMessage } from '../utils/get-err-message'
import { err500Logger } from '../utils/logger'
import { Environment } from '../utils/environment'

function handleLogErr({
  method,
  originalUrl,
  errMsg,
}: {
  method: string
  originalUrl: string
  errMsg: string
}) {
  err500Logger.info(
    `#${method}#${originalUrl}#500#validation=${Environment.APP_ENV.VALIDATION}#msg=${errMsg}`
  )
}

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

  if (err instanceof SequelizeBaseError) {
    const sequelizeErrMessages = errMsg.split('\n')
    if (sequelizeErrMessages.length > 1) {
      for (let i = 0; i < sequelizeErrMessages.length; i++) {
        const seqMsg = sequelizeErrMessages[i]
        handleLogErr({
          method: req.method,
          originalUrl: req.originalUrl,
          errMsg: seqMsg.split(',')[0],
        })
      }
    } else {
      handleLogErr({ method: req.method, originalUrl: req.originalUrl, errMsg })
    }
  } else {
    handleLogErr({ method: req.method, originalUrl: req.originalUrl, errMsg })
  }

  return res.status(statusCode).send({
    message: errMsg,
    statusCode,
  })
}
