import * as Sequelize from 'sequelize'
import { DataTypes, Model, Optional } from 'sequelize'

export interface AddressAttributes {
  id: number
  street: string
  city: string
  country: string
  postal_code: string
  user_id: number
  created_at: Date
  updated_at: Date
}

export type AddressPk = 'id'
export type AddressId = Address[AddressPk]
export type AddressOptionalAttributes = 'id' | 'created_at' | 'updated_at'
export type AddressCreationAttributes = Optional<
  AddressAttributes,
  AddressOptionalAttributes
>

export class Address
  extends Model<AddressAttributes, AddressCreationAttributes>
  implements AddressAttributes
{
  id!: number
  street!: string
  city!: string
  country!: string
  postal_code!: string
  user_id!: number
  created_at!: Date
  updated_at!: Date

  static initModel(sequelize: Sequelize.Sequelize): typeof Address {
    return Address.init(
      {
        id: {
          autoIncrement: true,
          type: DataTypes.INTEGER.UNSIGNED,
          allowNull: false,
          primaryKey: true,
        },
        street: {
          type: DataTypes.STRING(255),
          allowNull: false,
        },
        city: {
          type: DataTypes.STRING(255),
          allowNull: false,
        },
        country: {
          type: DataTypes.STRING(255),
          allowNull: false,
        },
        postal_code: {
          type: DataTypes.STRING(5),
          allowNull: false,
        },
        user_id: {
          type: DataTypes.INTEGER.UNSIGNED,
          allowNull: false,
          references: {
            model: 'user',
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
        tableName: 'address',
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
          {
            name: 'customer_id',
            using: 'BTREE',
            fields: [{ name: 'user_id' }],
          },
        ],
      }
    )
  }
}
