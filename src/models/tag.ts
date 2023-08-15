import * as Sequelize from 'sequelize'
import { DataTypes, Model, Optional } from 'sequelize'

export interface TagAttributes {
  id: number
  name: string
  created_at: Date
  updated_at: Date
}

export type TagPk = 'id'
export type TagId = Tag[TagPk]
export type TagOptionalAttributes = 'id' | 'created_at' | 'updated_at'
export type TagCreationAttributes = Optional<
  TagAttributes,
  TagOptionalAttributes
>

export class Tag
  extends Model<TagAttributes, TagCreationAttributes>
  implements TagAttributes
{
  id!: number
  name!: string
  created_at!: Date
  updated_at!: Date

  static initModel(sequelize: Sequelize.Sequelize): typeof Tag {
    return Tag.init(
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
        tableName: 'tag',
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
