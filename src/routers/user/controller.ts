import { Request, Response } from 'express'
import { Database } from '../../utils/database'
import { UserService } from '../../utils/user-service'
import { UserValidator } from './validator'
import { JoiValidationError } from '../../errors/joi-validation-err'

export class UserController {
  static create = async (req: Request, res: Response) => {
    const transaction = await Database.getTransaction()
    try {
      const user = await UserService.create(req.body, transaction)

      await transaction.commit()
      return res.status(201).send(user)
    } catch (error) {
      await transaction.rollback()
      throw error
    }
  }

  static createWithPartialJoiValidation = async (
    req: Request,
    res: Response
  ) => {
    const { error, value } = UserValidator.partialValidateCreatePayloadWithJoi(
      req.body
    )

    if (error) throw new JoiValidationError(error)

    const transaction = await Database.getTransaction()
    try {
      const user = await UserService.create(value, transaction)

      await transaction.commit()
      return res.status(201).send(user)
    } catch (error) {
      await transaction.rollback()
      throw error
    }
  }

  static createWithFullJoiValidation = async (req: Request, res: Response) => {
    const { error, value } = UserValidator.fullValidateCreatePayloadWithJoi(
      req.body
    )

    if (error) throw new JoiValidationError(error)

    const transaction = await Database.getTransaction()
    try {
      const user = await UserService.create(value, transaction)

      await transaction.commit()
      return res.status(201).send(user)
    } catch (error) {
      await transaction.rollback()
      throw error
    }
  }
}
