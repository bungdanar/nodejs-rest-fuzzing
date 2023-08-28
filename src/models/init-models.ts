import type { Sequelize } from 'sequelize'
import { Address as _Address } from './address'
import type { AddressAttributes, AddressCreationAttributes } from './address'
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
import { Role as _Role } from './role'
import type { RoleAttributes, RoleCreationAttributes } from './role'
import { Shipping as _Shipping } from './shipping'
import type { ShippingAttributes, ShippingCreationAttributes } from './shipping'
import { Tag as _Tag } from './tag'
import type { TagAttributes, TagCreationAttributes } from './tag'
import { User as _User } from './user'
import type { UserAttributes, UserCreationAttributes } from './user'
import { UserRole as _UserRole } from './user-role'
import type {
  UserRoleAttributes,
  UserRoleCreationAttributes,
} from './user-role'

export {
  _Address as Address,
  _Category as Category,
  _Coupon as Coupon,
  _Product as Product,
  _ProductCategory as ProductCategory,
  _ProductCoupon as ProductCoupon,
  _ProductTag as ProductTag,
  _Role as Role,
  _Shipping as Shipping,
  _Tag as Tag,
  _User as User,
  _UserRole as UserRole,
}

export type {
  AddressAttributes,
  AddressCreationAttributes,
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
  RoleAttributes,
  RoleCreationAttributes,
  ShippingAttributes,
  ShippingCreationAttributes,
  TagAttributes,
  TagCreationAttributes,
  UserAttributes,
  UserCreationAttributes,
  UserRoleAttributes,
  UserRoleCreationAttributes,
}

export function initModels(sequelize: Sequelize) {
  const Address = _Address.initModel(sequelize)
  const Category = _Category.initModel(sequelize)
  const Coupon = _Coupon.initModel(sequelize)
  const Product = _Product.initModel(sequelize)
  const ProductCategory = _ProductCategory.initModel(sequelize)
  const ProductCoupon = _ProductCoupon.initModel(sequelize)
  const ProductTag = _ProductTag.initModel(sequelize)
  const Role = _Role.initModel(sequelize)
  const Shipping = _Shipping.initModel(sequelize)
  const Tag = _Tag.initModel(sequelize)
  const User = _User.initModel(sequelize)
  const UserRole = _UserRole.initModel(sequelize)

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
  User.belongsToMany(Role, {
    as: 'roles',
    through: UserRole,
    foreignKey: 'user_id',
    otherKey: 'role_id',
  })
  Role.belongsToMany(User, {
    as: 'users',
    through: UserRole,
    foreignKey: 'role_id',
    otherKey: 'user_id',
  })
  User.hasMany(Address, {
    as: 'addresses',
    sourceKey: 'id',
    foreignKey: 'user_id',
  })
  User.hasMany(Product, {
    as: 'products',
    sourceKey: 'id',
    foreignKey: 'seller_id',
  })

  return {
    Address: Address,
    Category: Category,
    Coupon: Coupon,
    Product: Product,
    ProductCategory: ProductCategory,
    ProductCoupon: ProductCoupon,
    ProductTag: ProductTag,
    Role: Role,
    Shipping: Shipping,
    Tag: Tag,
    User: User,
    UserRole: UserRole,
  }
}
