import * as Sequelize from 'sequelize'
import { DataTypes, Model, Optional } from 'sequelize'

export interface ProductTagAttributes {
  product_id: number
  tag_id: number
  created_at: Date
  updated_at: Date
}

export type ProductTagPk = 'product_id' | 'tag_id'
export type ProductTagId = ProductTag[ProductTagPk]
export type ProductTagOptionalAttributes = 'created_at' | 'updated_at'
export type ProductTagCreationAttributes = Optional<
  ProductTagAttributes,
  ProductTagOptionalAttributes
>

export class ProductTag
  extends Model<ProductTagAttributes, ProductTagCreationAttributes>
  implements ProductTagAttributes
{
  product_id!: number
  tag_id!: number
  created_at!: Date
  updated_at!: Date

  static initModel(sequelize: Sequelize.Sequelize): typeof ProductTag {
    return ProductTag.init(
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
        tag_id: {
          type: DataTypes.INTEGER.UNSIGNED,
          allowNull: false,
          primaryKey: true,
          references: {
            model: 'tag',
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
        tableName: 'product_tag',
        timestamps: true,
        createdAt: 'created_at',
        updatedAt: 'updated_at',
        indexes: [
          {
            name: 'PRIMARY',
            unique: true,
            using: 'BTREE',
            fields: [{ name: 'product_id' }, { name: 'tag_id' }],
          },
          {
            name: 'product_tag_ibfk_2',
            using: 'BTREE',
            fields: [{ name: 'tag_id' }],
          },
        ],
      }
    )
  }
}
