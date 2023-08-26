import * as Sequelize from 'sequelize'
import { DataTypes, Model, Optional } from 'sequelize'

export interface ShippingAttributes {
  id: number
  description: string
  charge: number
  free: number
  estimated_days: number
  product_id: number
  created_at: Date
  updated_at: Date
}

export type ShippingPk = 'id'
export type ShippingId = Shipping[ShippingPk]
export type ShippingOptionalAttributes =
  | 'id'
  | 'free'
  | 'created_at'
  | 'updated_at'
export type ShippingCreationAttributes = Optional<
  ShippingAttributes,
  ShippingOptionalAttributes
>

export class Shipping
  extends Model<ShippingAttributes, ShippingCreationAttributes>
  implements ShippingAttributes
{
  id!: number
  description!: string
  charge!: number
  free!: number
  estimated_days!: number
  product_id!: number
  created_at!: Date
  updated_at!: Date

  static initModel(sequelize: Sequelize.Sequelize): typeof Shipping {
    return Shipping.init(
      {
        id: {
          autoIncrement: true,
          type: DataTypes.INTEGER.UNSIGNED,
          allowNull: false,
          primaryKey: true,
        },
        description: {
          type: DataTypes.STRING(1000),
          allowNull: false,
        },
        charge: {
          type: DataTypes.DECIMAL(19, 4),
          allowNull: false,
        },
        free: {
          type: DataTypes.BOOLEAN,
          allowNull: false,
          defaultValue: 0,
        },
        estimated_days: {
          type: DataTypes.INTEGER.UNSIGNED,
          allowNull: false,
        },
        product_id: {
          type: DataTypes.INTEGER.UNSIGNED,
          allowNull: false,
          references: {
            model: 'product',
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
        tableName: 'shipping',
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
            name: 'shipping_ibfk_1',
            using: 'BTREE',
            fields: [{ name: 'product_id' }],
          },
        ],
      }
    )
  }
}
