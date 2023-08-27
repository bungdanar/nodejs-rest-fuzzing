import * as Sequelize from 'sequelize'
import { DataTypes, Model, Optional } from 'sequelize'

export interface UserAttributes {
  id: number
  first_name: string
  last_name: string
  email: string
  phone_code: string
  phone_number: string
  created_at: Date
  updated_at: Date
}

export type UserPk = 'id'
export type UserId = User[UserPk]
export type UserOptionalAttributes = 'id' | 'created_at' | 'updated_at'
export type UserCreationAttributes = Optional<
  UserAttributes,
  UserOptionalAttributes
>

export class User
  extends Model<UserAttributes, UserCreationAttributes>
  implements UserAttributes
{
  id!: number
  first_name!: string
  last_name!: string
  email!: string
  phone_code!: string
  phone_number!: string
  created_at!: Date
  updated_at!: Date

  static initModel(sequelize: Sequelize.Sequelize): typeof User {
    return User.init(
      {
        id: {
          autoIncrement: true,
          type: DataTypes.INTEGER.UNSIGNED,
          allowNull: false,
          primaryKey: true,
        },
        first_name: {
          type: DataTypes.STRING(255),
          allowNull: false,
        },
        last_name: {
          type: DataTypes.STRING(255),
          allowNull: false,
        },
        email: {
          type: DataTypes.STRING(255),
          allowNull: false,
        },
        phone_code: {
          type: DataTypes.STRING(3),
          allowNull: false,
        },
        phone_number: {
          type: DataTypes.STRING(12),
          allowNull: false,
        },
        created_at: {
          type: DataTypes.DATE,
          allowNull: false,
        },
        updated_at: {
          type: DataTypes.DATE,
          allowNull: false,
        },
      },
      {
        sequelize,
        tableName: 'user',
        timestamps: true,
        createdAt: 'created_at',
        updatedAt: 'updated_at',
        indexes: [
          {
            name: 'PRIMARY',
            unique: true,
            using: 'BTREE',
            fields: [{ name: 'id' }],
          },
        ],
      }
    )
  }
}
