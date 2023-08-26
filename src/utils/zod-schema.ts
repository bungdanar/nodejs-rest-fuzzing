import { z } from 'zod'

export class ZodSchemaUtility {
  static productCreatePartialZodValidationSchema = z.object({
    name: z.string(),
    sku: z.string(),
    regular_price: z.coerce.number(),
    discount_price: z.coerce.number(),
    quantity: z.coerce.number().int(),
    description: z.string(),
    weight: z.coerce.number(),
    note: z.string(),
    published: z.coerce.boolean().optional(),
  })

  private static tagCreatePartialZodValidationSchema = z
    .array(z.string())
    .nonempty()

  private static categoryCreatePartialZodValidationSchema = z.object({
    name: z.string(),
    description: z.string(),
  })

  private static couponCreatePartialZodValidationSchema = z.object({
    code: z.string(),
    description: z.string(),
    discount_value: z.coerce.number(),
    discount_type: z.string(),
    times_used: z.coerce.number().int().optional(),
    max_usage: z.coerce.number().int(),
    start_date: z.coerce.date(),
    end_date: z.coerce.date(),
  })

  static productTagCategoryCreatePartialZodValidationSchema =
    this.productCreatePartialZodValidationSchema.extend({
      tags: this.tagCreatePartialZodValidationSchema,
      category: this.categoryCreatePartialZodValidationSchema,
    })

  static productTagCategoryCouponCreatePartialZodValidationSchema =
    this.productCreatePartialZodValidationSchema.extend({
      tags: this.tagCreatePartialZodValidationSchema,
      categories: z
        .array(this.categoryCreatePartialZodValidationSchema)
        .nonempty(),
      coupons: z.array(this.couponCreatePartialZodValidationSchema).nonempty(),
    })

  static productCreateFullZodValidationSchema = z.object({
    name: z.string().min(3).max(255),
    sku: z.string().min(3).max(255),
    regular_price: z.coerce.number().nonnegative(),
    discount_price: z.coerce.number().nonnegative(),
    quantity: z.coerce.number().int().nonnegative().lte(9999),
    description: z.string().min(3).max(1000),
    weight: z.coerce.number().nonnegative().lte(1000),
    note: z.string().min(3).max(255),
    published: z.coerce.boolean().optional(),
  })

  private static tagCreateFullZodValidationSchema = z
    .array(z.string().min(3).max(255))
    .nonempty()

  private static categoryCreateFullZodValidationSchema = z.object({
    name: z.string().min(3).max(255),
    description: z.string().min(3).max(1000),
  })

  private static couponCreateFullZodValidationSchema = z
    .object({
      code: z.string().min(3).max(255),
      description: z.string().min(3).max(1000),
      discount_value: z.coerce.number().nonnegative().lte(100),
      discount_type: z.string().min(3).max(255),
      times_used: z.coerce.number().int().nonnegative().optional(),
      max_usage: z.coerce.number().int().nonnegative(),
      start_date: z.coerce.date(),
      end_date: z.coerce.date(),
    })
    .refine(
      (data) => {
        if (data.times_used) {
          return data.times_used <= data.max_usage
        } else {
          return true
        }
      },
      {
        path: ['times_used'],
        message: 'Must be less than or equal to max_usage',
      }
    )
    .refine((data) => data.end_date >= data.start_date, {
      path: ['end_date'],
      message: 'Must be greater than or equal to start_date',
    })

  static productTagCategoryFullZodValidationSchema =
    this.productCreateFullZodValidationSchema
      .extend({
        tags: this.tagCreateFullZodValidationSchema,
        category: this.categoryCreateFullZodValidationSchema,
      })
      .refine((data) => data.discount_price <= data.regular_price, {
        path: ['discount_price'],
        message: 'Must be less than or equal to regular_price',
      })

  static productTagCategoryCouponCreateFullZodValidationSchema =
    this.productCreateFullZodValidationSchema
      .extend({
        tags: this.tagCreateFullZodValidationSchema,
        categories: z
          .array(this.categoryCreateFullZodValidationSchema)
          .nonempty(),
        coupons: z.array(this.couponCreateFullZodValidationSchema).nonempty(),
      })
      .refine((data) => data.discount_price <= data.regular_price, {
        path: ['discount_price'],
        message: 'Must be less than or equal to regular_price',
      })

  static refineProductCreateSchema = (
    schema: typeof this.productCreateFullZodValidationSchema
  ) =>
    schema.refine((data) => data.discount_price <= data.regular_price, {
      path: ['discount_price'],
      message: 'Must be less than or equal to regular_price',
    })
}
