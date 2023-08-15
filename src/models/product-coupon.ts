import * as Sequelize from 'sequelize'
import { DataTypes, Model, Optional } from 'sequelize'

export interface ProductCouponAttributes {
  product_id: number
  coupon_id: number
  created_at: Date
  updated_at: Date
}

export type ProductCouponPk = 'product_id' | 'coupon_id'
export type ProductCouponId = ProductCoupon[ProductCouponPk]
export type ProductCouponOptionalAttributes = 'created_at' | 'updated_at'
export type ProductCouponCreationAttributes = Optional<
  ProductCouponAttributes,
  ProductCouponOptionalAttributes
>

export class ProductCoupon
  extends Model<ProductCouponAttributes, ProductCouponCreationAttributes>
  implements ProductCouponAttributes
{
  product_id!: number
  coupon_id!: number
  created_at!: Date
  updated_at!: Date

  static initModel(sequelize: Sequelize.Sequelize): typeof ProductCoupon {
    return ProductCoupon.init(
      {
        product_id: {
          type: DataTypes.INTEGER.UNSIGNED,
          allowNull: false,
          primaryKey: true,
          references: {
            model: 'product',
            key: 'id',
          },
        },
        coupon_id: {
          type: DataTypes.INTEGER.UNSIGNED,
          allowNull: false,
          primaryKey: true,
          references: {
            model: 'coupon',
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
        tableName: 'product_coupon',
        timestamps: true,
        createdAt: 'created_at',
        updatedAt: 'updated_at',
        indexes: [
          {
            name: 'PRIMARY',
            unique: true,
            using: 'BTREE',
            fields: [{ name: 'product_id' }, { name: 'coupon_id' }],
          },
          {
            name: 'product_coupon_ibfk_2',
            using: 'BTREE',
            fields: [{ name: 'coupon_id' }],
          },
        ],
      }
    )
  }
}
