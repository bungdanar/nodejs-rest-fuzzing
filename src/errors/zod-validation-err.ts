import { ZodError } from 'zod'
import { CustomError } from './custom-err'

export class ZodValidationError extends CustomError {
  readonly statusCode: number = 400

  constructor(readonly error: ZodError) {
    super('Invalid request parameters')

    Object.setPrototypeOf(this, ZodValidationError.prototype)
  }

  serializeError(): { message: string; statusCode: number } {
    const issues = this.error.issues

    return {
      message: `${issues[0].path[0]}: ${issues[0].message}`,
      statusCode: this.statusCode,
    }
  }
}
