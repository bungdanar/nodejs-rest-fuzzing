import { product, category, coupon } from '@prisma/client'

type CategoryCreatePayload = Pick<category, 'name' | 'description'>

type CouponCreatePayload = Omit<coupon, 'id' | 'created_at' | 'updated_at'> &
  Partial<Pick<coupon, 'times_used'>>

export type ProductCreatePayload = Omit<
  product,
  'id' | 'published' | 'created_at' | 'updated_at'
> &
  Partial<Pick<product, 'published'>>

export type ProductWithTagCategoryCreatePayload = ProductCreatePayload & {
  tags: string[]
  category: CategoryCreatePayload
}

export type ProductWithTagCategoryCouponCreatePayload = ProductCreatePayload & {
  tags: string[]
  categories: CategoryCreatePayload[]
  coupons: CouponCreatePayload[]
}
