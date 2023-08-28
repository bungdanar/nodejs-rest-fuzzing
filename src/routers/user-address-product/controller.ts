import { Request, Response } from 'express'
import { Database } from '../../utils/database'
import { UserService } from '../../utils/user-service'

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
}
