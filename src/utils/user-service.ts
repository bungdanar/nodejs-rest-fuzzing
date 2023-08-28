import { Transaction } from 'sequelize'
import {
  UserAddressCreatePayload,
  UserAddressProductCreatePayload,
  UserAddressProductShippingCreatePayload,
  UserCreatePayload,
} from '../data-type/user'
import { Product, User, UserRole } from '../models/init-models'

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

  static createWithAddress = async (
    payload: UserAddressCreatePayload,
    transaction: Transaction | null | undefined
  ): Promise<User> => {
    const { address: addressPayload, ...userPayload } = payload

    const user = await User.create(
      {
        ...userPayload,
        // @ts-ignore
        addresses: [addressPayload],
      },
      { transaction, include: [{ association: User.associations.addresses }] }
    )

    await UserRole.create(
      {
        user_id: user.id,
        role_id: 2,
      },
      { transaction }
    )

    return user
  }

  static createWithAddressProduct = async (
    payload: UserAddressProductCreatePayload,
    transaction: Transaction | null | undefined
  ): Promise<User> => {
    const {
      addresses: addressPayloads,
      product: productPayload,
      ...userPayload
    } = payload

    const user = await User.create(
      {
        ...userPayload,
        // @ts-ignore
        addresses: addressPayloads,
        // @ts-ignore
        products: [productPayload],
      },
      {
        transaction,
        include: [
          { association: User.associations.addresses },
          { association: User.associations.products },
        ],
      }
    )

    await UserRole.create(
      {
        user_id: user.id,
        role_id: 2,
      },
      { transaction }
    )

    return user
  }

  static createWithAddressProductShipping = async (
    payload: UserAddressProductShippingCreatePayload,
    transaction: Transaction | null | undefined
  ): Promise<User> => {
    const {
      addresses: addressPayloads,
      product: productPayload,
      shipping: shippingPayload,
      ...userPayload
    } = payload

    const createdUser = await User.create(
      {
        ...userPayload,
        // @ts-ignore
        addresses: addressPayloads,
      },
      {
        transaction,
        include: [{ association: User.associations.addresses }],
      }
    )

    const createdProduct = await Product.create(
      {
        ...productPayload,
        seller_id: createdUser.id,
        // @ts-ignore
        shippings: [shippingPayload],
      },
      {
        transaction,
        include: [{ association: Product.associations.shippings }],
      }
    )

    await UserRole.create(
      {
        user_id: createdUser.id,
        role_id: 2,
      },
      { transaction }
    )

    createdUser.products = [createdProduct]

    return createdUser
  }
}
