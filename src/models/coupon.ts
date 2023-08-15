import * as Sequelize from 'sequelize'
import { DataTypes, Model, Optional } from 'sequelize'

export interface CouponAttributes {
  id: number
  code: string
  description: string
  discount_value: number
  discount_type: string
  times_used: number
  max_usage: number
  start_date: Date
  end_date: Date
  created_at: Date
  updated_at: Date
}

export type CouponPk = 'id'
export type CouponId = Coupon[CouponPk]
export type CouponOptionalAttributes =
  | 'id'
  | 'times_used'
  | 'created_at'
  | 'updated_at'
export type CouponCreationAttributes = Optional<
  CouponAttributes,
  CouponOptionalAttributes
>

export class Coupon
  extends Model<CouponAttributes, CouponCreationAttributes>
  implements CouponAttributes
{
  id!: number
  code!: string
  description!: string
  discount_value!: number
  discount_type!: string
  times_used!: number
  max_usage!: number
  start_date!: Date
  end_date!: Date
  created_at!: Date
  updated_at!: Date

  static initModel(sequelize: Sequelize.Sequelize): typeof Coupon {
    return Coupon.init(
      {
        id: {
          autoIncrement: true,
          type: DataTypes.INTEGER.UNSIGNED,
          allowNull: false,
          primaryKey: true,
        },
        code: {
          type: DataTypes.STRING(255),
          allowNull: false,
        },
        description: {
          type: DataTypes.STRING(1000),
          allowNull: false,
        },
        discount_value: {
          type: DataTypes.DECIMAL(5, 2),
          allowNull: false,
        },
        discount_type: {
          type: DataTypes.STRING(255),
          allowNull: false,
        },
        times_used: {
          type: DataTypes.INTEGER.UNSIGNED,
          allowNull: false,
          defaultValue: 0,
        },
        max_usage: {
          type: DataTypes.INTEGER.UNSIGNED,
          allowNull: false,
        },
        start_date: {
          type: DataTypes.DATE,
          allowNull: false,
        },
        end_date: {
          type: DataTypes.DATE,
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
        tableName: 'coupon',
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
