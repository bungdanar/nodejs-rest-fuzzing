import * as Sequelize from 'sequelize'
import { DataTypes, Model, Optional } from 'sequelize'

export interface ProductCategoryAttributes {
  product_id: number
  category_id: number
  created_at: Date
  updated_at: Date
}

export type ProductCategoryPk = 'product_id' | 'category_id'
export type ProductCategoryId = ProductCategory[ProductCategoryPk]
export type ProductCategoryOptionalAttributes = 'created_at' | 'updated_at'
export type ProductCategoryCreationAttributes = Optional<
  ProductCategoryAttributes,
  ProductCategoryOptionalAttributes
>

export class ProductCategory
  extends Model<ProductCategoryAttributes, ProductCategoryCreationAttributes>
  implements ProductCategoryAttributes
{
  product_id!: number
  category_id!: number
  created_at!: Date
  updated_at!: Date

  static initModel(sequelize: Sequelize.Sequelize): typeof ProductCategory {
    return ProductCategory.init(
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
        category_id: {
          type: DataTypes.INTEGER.UNSIGNED,
          allowNull: false,
          primaryKey: true,
          references: {
            model: 'category',
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
        tableName: 'product_category',
        timestamps: true,
        createdAt: 'created_at',
        updatedAt: 'updated_at',
        indexes: [
          {
            name: 'PRIMARY',
            unique: true,
            using: 'BTREE',
            fields: [{ name: 'product_id' }, { name: 'category_id' }],
          },
          {
            name: 'category_id',
            using: 'BTREE',
            fields: [{ name: 'category_id' }],
          },
        ],
      }
    )
  }
}
