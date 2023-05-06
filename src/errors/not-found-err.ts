import { CustomError } from './custom-err'

export class NotFoundError extends CustomError {
  readonly statusCode: number = 404

  constructor(readonly error: string = 'Not Found') {
    super(error)

    Object.setPrototypeOf(this, NotFoundError.prototype)
  }

  serializeError(): { message: string; statusCode: number } {
    return {
      message: this.error,
      statusCode: this.statusCode,
    }
  }
}
