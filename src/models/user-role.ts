import * as Sequelize from 'sequelize'
import { DataTypes, Model, Optional } from 'sequelize'

export interface UserRoleAttributes {
  user_id: number
  role_id: number
  created_at: Date
  updated_at: Date
}

export type UserRolePk = 'user_id' | 'role_id'
export type UserRoleId = UserRole[UserRolePk]
export type UserRoleOptionalAttributes = 'created_at' | 'updated_at'
export type UserRoleCreationAttributes = Optional<
  UserRoleAttributes,
  UserRoleOptionalAttributes
>

export class UserRole
  extends Model<UserRoleAttributes, UserRoleCreationAttributes>
  implements UserRoleAttributes
{
  user_id!: number
  role_id!: number
  created_at!: Date
  updated_at!: Date

  static initModel(sequelize: Sequelize.Sequelize): typeof UserRole {
    return UserRole.init(
      {
        user_id: {
          type: DataTypes.INTEGER.UNSIGNED,
          allowNull: false,
          primaryKey: true,
          references: {
            model: 'user',
            key: 'id',
          },
        },
        role_id: {
          type: DataTypes.INTEGER.UNSIGNED,
          allowNull: false,
          primaryKey: true,
          references: {
            model: 'role',
            key: 'id',
          },
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
        tableName: 'user_role',
        timestamps: true,
        createdAt: 'created_at',
        updatedAt: 'updated_at',
        indexes: [
          {
            name: 'PRIMARY',
            unique: true,
            using: 'BTREE',
            fields: [{ name: 'user_id' }, { name: 'role_id' }],
          },
          {
            name: 'role_id',
            using: 'BTREE',
            fields: [{ name: 'role_id' }],
          },
        ],
      }
    )
  }
}
