import { NextFunction, Request, Response } from 'express'
import { CustomError } from '../errors/custom-err'
import { getErrorMessage } from '../utils/get-err-message'

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
  console.log('\x1b[31m%s\x1b[0m', getErrorMessage(err))

  return res.status(500).send({
    message: 'Internal Server Error',
    statusCode: 500,
  })
}
