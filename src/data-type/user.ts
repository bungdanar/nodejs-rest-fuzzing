import { AddressAttributes, UserAttributes } from '../models/init-models'
import { ProductCreatePayload, ShippingCreatePayload } from './product'

export type UserCreatePayload = Omit<
  UserAttributes,
  'id' | 'created_at' | 'updated_at' | 'roles' | 'addresses' | 'products'
>

export type AddressCreatePayload = Omit<
  AddressAttributes,
  'id' | 'user_id' | 'created_at' | 'updated_at'
>

export type UserAddressCreatePayload = UserCreatePayload & {
  address: AddressCreatePayload
}

export type UserAddressProductCreatePayload = UserCreatePayload & {
  addresses: AddressCreatePayload[]
  product: ProductCreatePayload
}

export type UserAddressProductShippingCreatePayload =
  UserAddressProductCreatePayload & {
    shipping: ShippingCreatePayload
  }
