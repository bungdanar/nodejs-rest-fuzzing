import {
  CategoryAttributes,
  CouponAttributes,
  ProductAttributes,
} from '../models/init-models'

type CategoryCreatePayload = Pick<CategoryAttributes, 'name' | 'description'>

type CouponCreatePayload = Omit<
  CouponAttributes,
  'id' | 'created_at' | 'updated_at'
> &
  Partial<Pick<CouponAttributes, 'times_used'>>

export type ProductCreatePayload = Omit<
  ProductAttributes,
  | 'id'
  | 'published'
  | 'created_at'
  | 'updated_at'
  | 'tags'
  | 'categories'
  | 'coupons'
> &
  Partial<Pick<ProductAttributes, 'published'>>

export type ProductTagCategoryCreatePayload = ProductCreatePayload & {
  tags: string[]
  category: CategoryCreatePayload
}

export type ProductTagCategoryCouponCreatePayload = ProductCreatePayload & {
  tags: string[]
  categories: CategoryCreatePayload[]
  coupons: CouponCreatePayload[]
}
