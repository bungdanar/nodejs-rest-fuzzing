import { Request, Response } from 'express'
import { Database } from '../../utils/database'
import { UserService } from '../../utils/user-service'
import { UserAddrProdValidator } from './validator'
import { JoiValidationError } from '../../errors/joi-validation-err'
import { ZodValidationError } from '../../errors/zod-validation-err'

export class UserAddressProductController {
  static create = async (req: Request, res: Response) => {
    const transaction = await Database.getTransaction()
    try {
      const user = await UserService.createWithAddressProduct(
        req.body,
        transaction
      )

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
      UserAddrProdValidator.partialValidateCreatePayloadWithJoi(req.body)

    if (error) throw new JoiValidationError(error)

    const transaction = await Database.getTransaction()
    try {
      const user = await UserService.createWithAddressProduct(
        value,
        transaction
      )

      await transaction.commit()
      return res.status(201).send(user)
    } catch (error) {
      await transaction.rollback()
      throw error
    }
  }

  static createWithFullJoiValidation = async (req: Request, res: Response) => {
    const { error, value } =
      UserAddrProdValidator.fullValidateCreatePayloadWithJoi(req.body)

    if (error) throw new JoiValidationError(error)

    const transaction = await Database.getTransaction()
    try {
      const user = await UserService.createWithAddressProduct(
        value,
        transaction
      )

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
      UserAddrProdValidator.partialValidateCreatePayloadWithZod(req.body)

    if (!validationResult.success)
      throw new ZodValidationError(validationResult.error)

    const transaction = await Database.getTransaction()
    try {
      const user = await UserService.createWithAddressProduct(
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
    const validationResult =
      UserAddrProdValidator.fullValidateCreatePayloadWithZod(req.body)

    if (!validationResult.success)
      throw new ZodValidationError(validationResult.error)

    const transaction = await Database.getTransaction()
    try {
      const user = await UserService.createWithAddressProduct(
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
