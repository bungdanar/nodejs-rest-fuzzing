import * as Sequelize from 'sequelize'
import { DataTypes, Model, Optional } from 'sequelize'

export interface CategoryAttributes {
  id: number
  name: string
  description: string
  active: number
  created_at: Date
  updated_at: Date
}

export type CategoryPk = 'id'
export type CategoryId = Category[CategoryPk]
export type CategoryOptionalAttributes =
  | 'id'
  | 'active'
  | 'created_at'
  | 'updated_at'
export type CategoryCreationAttributes = Optional<
  CategoryAttributes,
  CategoryOptionalAttributes
>

export class Category
  extends Model<CategoryAttributes, CategoryCreationAttributes>
  implements CategoryAttributes
{
  id!: number
  name!: string
  description!: string
  active!: number
  created_at!: Date
  updated_at!: Date

  static initModel(sequelize: Sequelize.Sequelize): typeof Category {
    return Category.init(
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
        description: {
          type: DataTypes.STRING(1000),
          allowNull: false,
        },
        active: {
          type: DataTypes.BOOLEAN,
          allowNull: false,
          defaultValue: 1,
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
        tableName: 'category',
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
