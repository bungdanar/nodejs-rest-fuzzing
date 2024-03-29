import { Request, Response } from 'express'
import { Database } from '../../utils/database'
import { UserService } from '../../utils/user-service'
import { UserAddrValidator } from './validator'
import { JoiValidationError } from '../../errors/joi-validation-err'
import { ZodValidationError } from '../../errors/zod-validation-err'

export class UserAddressController {
  static create = async (req: Request, res: Response) => {
    const transaction = await Database.getTransaction()
    try {
      const user = await UserService.createWithAddress(req.body, transaction)

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
    const { error, value } =
      UserAddrValidator.partialValidateCreatePayloadWithJoi(req.body)

    if (error) throw new JoiValidationError(error)

    const transaction = await Database.getTransaction()
    try {
      const user = await UserService.createWithAddress(value, transaction)

      await transaction.commit()
      return res.status(201).send(user)
    } catch (error) {
      await transaction.rollback()
      throw error
    }
  }

  static createWithFullJoiValidation = async (req: Request, res: Response) => {
    const { error, value } = UserAddrValidator.fullValidateCreatePayloadWithJoi(
      req.body
    )

    if (error) throw new JoiValidationError(error)

    const transaction = await Database.getTransaction()
    try {
      const user = await UserService.createWithAddress(value, transaction)

      await transaction.commit()
      return res.status(201).send(user)
    } catch (error) {
      await transaction.rollback()
      throw error
    }
  }

  static createWithPartialZodValidation = async (
    req: Request,
    res: Response
  ) => {
    const validationResult =
      UserAddrValidator.partialValidateCreatePayloadWithZod(req.body)

    if (!validationResult.success)
      throw new ZodValidationError(validationResult.error)

    const transaction = await Database.getTransaction()
    try {
      const user = await UserService.createWithAddress(
        validationResult.data,
        transaction
      )

      await transaction.commit()
      return res.status(201).send(user)
    } catch (error) {
      await transaction.rollback()
      throw error
    }
  }

  static createWithFullZodValidation = async (req: Request, res: Response) => {
    const validationResult = UserAddrValidator.fullValidateCreatePayloadWithZod(
      req.body
    )

    if (!validationResult.success)
      throw new ZodValidationError(validationResult.error)

    const transaction = await Database.getTransaction()
    try {
      const user = await UserService.createWithAddress(
        validationResult.data,
        transaction
      )

      await transaction.commit()
      return res.status(201).send(user)
    } catch (error) {
      await transaction.rollback()
      throw error
    }
  }
}
