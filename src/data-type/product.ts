import {
  CategoryAttributes,
  CouponAttributes,
  ProductAttributes,
  ShippingAttributes,
} from '../models/init-models'

export type CategoryCreatePayload = Pick<
  CategoryAttributes,
  'name' | 'description'
>

export type CouponCreatePayload = Omit<
  CouponAttributes,
  'id' | 'created_at' | 'updated_at' | 'times_used'
> &
  Partial<Pick<CouponAttributes, 'times_used'>>

export type ShippingCreatePayload = Omit<
  ShippingAttributes,
  'id' | 'free' | 'product_id' | 'created_at' | 'updated_at'
> & {
  free?: number | boolean | undefined
}

export type ProductCreatePayload = Omit<
  ProductAttributes,
  | 'id'
  | 'published'
  | 'seller_id'
  | 'created_at'
  | 'updated_at'
  | 'tags'
  | 'categories'
  | 'coupons'
  | 'shippings'
> & {
  published?: number | boolean | undefined
  seller_id?: number | undefined
}

export type ProductTagCategoryCreatePayload = ProductCreatePayload & {
  tags: string[]
  category: CategoryCreatePayload
}

export type ProductTagCategoryCouponCreatePayload = ProductCreatePayload & {
  tags: string[]
  categories: CategoryCreatePayload[]
  coupons: CouponCreatePayload[]
}
