import { AddressAttributes, UserAttributes } from '../models/init-models'

export type UserCreatePayload = Omit<
  UserAttributes,
  'id' | 'created_at' | 'updated_at' | 'roles' | 'addresses'
>

export type AddressCreatePayload = Omit<
  AddressAttributes,
  'id' | 'user_id' | 'created_at' | 'updated_at'
>

export type UserAddressCreatePayload = UserCreatePayload & {
  address: AddressCreatePayload
}
