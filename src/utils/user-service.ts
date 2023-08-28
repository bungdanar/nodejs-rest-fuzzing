import { Transaction } from 'sequelize'
import { UserCreatePayload } from '../data-type/user'
import { User, UserRole } from '../models/init-models'

export class UserService {
  static create = async (
    payload: UserCreatePayload,
    transaction: Transaction | null | undefined
  ): Promise<User> => {
    const user = await User.create(payload, { transaction })

    await UserRole.create(
      {
        user_id: user.id,
        role_id: 2,
      },
      { transaction }
    )

    return user
  }
}
