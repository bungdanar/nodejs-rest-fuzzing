import { UserAttributes } from '../models/init-models'

export type UserCreatePayload = Omit<
  UserAttributes,
  'id' | 'created_at' | 'updated_at' | 'roles'
>
