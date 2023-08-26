import * as Sequelize from 'sequelize'
import { Association, DataTypes, Model, Optional } from 'sequelize'
import { Tag, TagAttributes } from './tag'
import { Category, CategoryAttributes } from './category'
import { Coupon, CouponAttributes } from './coupon'

export interface ProductAttributes {
  id: number
  name: string
  sku: string
  regular_price: number
  discount_price: number
  quantity: number
  description: string
  weight: number
  note: string
  published: number | boolean
  seller_id: number
  created_at: Date
  updated_at: Date

  tags?: TagAttributes[]
  categories?: CategoryAttributes[]
  coupons?: CouponAttributes[]
}

export type ProductPk = 'id'
export type ProductId = Product[ProductPk]
export type ProductOptionalAttributes =
  | 'id'
  | 'published'
  | 'seller_id'
  | 'created_at'
  | 'updated_at'
  | 'tags'
  | 'categories'
  | 'coupons'
export type ProductCreationAttributes = Optional<
  ProductAttributes,
  ProductOptionalAttributes
>

export class Product
  extends Model<ProductAttributes, ProductCreationAttributes>
  implements ProductAttributes
{
  id!: number
  name!: string
  sku!: string
  regular_price!: number
  discount_price!: number
  quantity!: number
  description!: string
  weight!: number
  note!: string
  published!: number | boolean
  seller_id!: number
  created_at!: Date
  updated_at!: Date

  tags?: Tag[]
  categories?: Category[]
  coupons?: Coupon[]

  static associations: {
    tags: Association<Product, Tag>
    categories: Association<Product, Category>
    coupons: Association<Product, Coupon>
  }

  static initModel(sequelize: Sequelize.Sequelize): typeof Product {
    return Product.init(
      {
        id: {
          autoIncrement: true,
          type: DataTypes.INTEGER.UNSIGNED,
          allowNull: false,
          primaryKey: true,
        },
        name: {
          type: DataTypes.STRING(255),
          allowNull: false,
        },
        sku: {
          type: DataTypes.STRING(255),
          allowNull: false,
        },
        regular_price: {
          type: DataTypes.DECIMAL(19, 4),
          allowNull: false,
        },
        discount_price: {
          type: DataTypes.DECIMAL(19, 4),
          allowNull: false,
        },
        quantity: {
          type: DataTypes.INTEGER.UNSIGNED,
          allowNull: false,
        },
        description: {
          type: DataTypes.STRING(1000),
          allowNull: false,
        },
        weight: {
          type: DataTypes.DECIMAL(8, 4),
          allowNull: false,
        },
        note: {
          type: DataTypes.STRING(255),
          allowNull: false,
        },
        published: {
          type: DataTypes.BOOLEAN,
          allowNull: false,
          defaultValue: 0,
        },
        seller_id: {
          type: DataTypes.INTEGER.UNSIGNED,
          allowNull: false,
          defaultValue: 1,
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
        tableName: 'product',
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
            name: 'seller_id',
            using: 'BTREE',
            fields: [{ name: 'seller_id' }],
          },
        ],
      }
    )
  }
}
