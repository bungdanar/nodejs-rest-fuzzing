import type { Sequelize } from 'sequelize'
import { Category as _Category } from './category'
import type { CategoryAttributes, CategoryCreationAttributes } from './category'
import { Coupon as _Coupon } from './coupon'
import type { CouponAttributes, CouponCreationAttributes } from './coupon'
import { Product as _Product } from './product'
import type { ProductAttributes, ProductCreationAttributes } from './product'
import { ProductCategory as _ProductCategory } from './product-category'
import type {
  ProductCategoryAttributes,
  ProductCategoryCreationAttributes,
} from './product-category'
import { ProductCoupon as _ProductCoupon } from './product-coupon'
import type {
  ProductCouponAttributes,
  ProductCouponCreationAttributes,
} from './product-coupon'
import { ProductTag as _ProductTag } from './product-tag'
import type {
  ProductTagAttributes,
  ProductTagCreationAttributes,
} from './product-tag'
import { Tag as _Tag } from './tag'
import type { TagAttributes, TagCreationAttributes } from './tag'

export {
  _Category as Category,
  _Coupon as Coupon,
  _Product as Product,
  _ProductCategory as ProductCategory,
  _ProductCoupon as ProductCoupon,
  _ProductTag as ProductTag,
  _Tag as Tag,
}

export type {
  CategoryAttributes,
  CategoryCreationAttributes,
  CouponAttributes,
  CouponCreationAttributes,
  ProductAttributes,
  ProductCreationAttributes,
  ProductCategoryAttributes,
  ProductCategoryCreationAttributes,
  ProductCouponAttributes,
  ProductCouponCreationAttributes,
  ProductTagAttributes,
  ProductTagCreationAttributes,
  TagAttributes,
  TagCreationAttributes,
}

export function initModels(sequelize: Sequelize) {
  const Category = _Category.initModel(sequelize)
  const Coupon = _Coupon.initModel(sequelize)
  const Product = _Product.initModel(sequelize)
  const ProductCategory = _ProductCategory.initModel(sequelize)
  const ProductCoupon = _ProductCoupon.initModel(sequelize)
  const ProductTag = _ProductTag.initModel(sequelize)
  const Tag = _Tag.initModel(sequelize)

  Category.belongsToMany(Product, {
    as: 'products',
    through: ProductCategory,
    foreignKey: 'category_id',
    otherKey: 'product_id',
  })
  Coupon.belongsToMany(Product, {
    as: 'products',
    through: ProductCoupon,
    foreignKey: 'coupon_id',
    otherKey: 'product_id',
  })
  Product.belongsToMany(Category, {
    as: 'categories',
    through: ProductCategory,
    foreignKey: 'product_id',
    otherKey: 'category_id',
  })
  Product.belongsToMany(Coupon, {
    as: 'coupons',
    through: ProductCoupon,
    foreignKey: 'product_id',
    otherKey: 'coupon_id',
  })
  Product.belongsToMany(Tag, {
    as: 'tags',
    through: ProductTag,
    foreignKey: 'product_id',
    otherKey: 'tag_id',
  })
  Tag.belongsToMany(Product, {
    as: 'products',
    through: ProductTag,
    foreignKey: 'tag_id',
    otherKey: 'product_id',
  })

  return {
    Category: Category,
    Coupon: Coupon,
    Product: Product,
    ProductCategory: ProductCategory,
    ProductCoupon: ProductCoupon,
    ProductTag: ProductTag,
    Tag: Tag,
  }
}
