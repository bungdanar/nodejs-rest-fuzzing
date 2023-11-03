import { z } from 'zod'

export class ZodSchemaUtility {
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
      max_usage: z.coerce.number().int().nonnegative().lte(9999),
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

  /**
   * Use this for combination with this schema as base schema.
   * And you need to refine the extended schema with this refine chain function example.
   * This is just how zod works with schema extension. Hope this will be fixed in the future.
   * @example.refine((data) => data.discount_price <= data.regular_price, {
        path: ['discount_price'],
        message: 'Must be less than or equal to regular_price',
      })
   */
  static productCreateFullZodValidationCoreSchema = z.object({
    name: z.string().min(3).max(255),
    sku: z.string().min(3).max(255),
    regular_price: z.coerce.number().nonnegative().lt(1e15),
    discount_price: z.coerce.number().nonnegative(),
    quantity: z.coerce.number().int().nonnegative().lte(9999),
    description: z.string().min(3).max(1000),
    weight: z.coerce.number().nonnegative().lte(1000),
    note: z.string().min(3).max(255),
    published: z.coerce.boolean().optional(),
  })

  /**
   * Use this for standalone use. Not for combination with this schema as base schema
   */
  static productCreateFullZodValidationRefinedSchema = z
    .object({
      name: z.string().min(3).max(255),
      sku: z.string().min(3).max(255),
      regular_price: z.coerce.number().nonnegative().lt(1e15),
      discount_price: z.coerce.number().nonnegative(),
      quantity: z.coerce.number().int().nonnegative().lte(9999),
      description: z.string().min(3).max(1000),
      weight: z.coerce.number().nonnegative().lte(1000),
      note: z.string().min(3).max(255),
      published: z.coerce.boolean().optional(),
    })
    .refine((data) => data.discount_price <= data.regular_price, {
      path: ['discount_price'],
      message: 'Must be less than or equal to regular_price',
    })

  static productTagCategoryFullZodValidationSchema =
    this.productCreateFullZodValidationCoreSchema
      .extend({
        tags: this.tagCreateFullZodValidationSchema,
        category: this.categoryCreateFullZodValidationSchema,
      })
      .refine((data) => data.discount_price <= data.regular_price, {
        path: ['discount_price'],
        message: 'Must be less than or equal to regular_price',
      })

  static productTagCategoryCouponCreateFullZodValidationSchema =
    this.productCreateFullZodValidationCoreSchema
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

  static userCreatePartialZodValidationSchema = z.object({
    first_name: z.string(),
    last_name: z.string(),
    email: z.string(),
    phone_code: z.string(),
    phone_number: z.string(),
  })

  private static addressCreatePartialZodValidationSchema = z.object({
    street: z.string(),
    city: z.string(),
    country: z.string(),
    postal_code: z.string(),
  })

  private static shippingCreatePartialZodValidationSchema = z.object({
    description: z.string(),
    charge: z.coerce.number(),
    free: z.coerce.boolean().optional(),
    estimated_days: z.coerce.number().int(),
  })

  static userAddrCreatePartialZodValidationSchema =
    this.userCreatePartialZodValidationSchema.extend({
      address: this.addressCreatePartialZodValidationSchema,
    })

  static userAddrProdCreatePartialZodValidationSchema =
    this.userCreatePartialZodValidationSchema.extend({
      addresses: z
        .array(this.addressCreatePartialZodValidationSchema)
        .nonempty(),
      product: this.productCreatePartialZodValidationSchema,
    })

  static userAddrProdShipCreatePartialZodValidationSchema =
    this.userAddrProdCreatePartialZodValidationSchema.extend({
      shipping: this.shippingCreatePartialZodValidationSchema,
    })

  static userCreateFullZodValidationSchema = z.object({
    first_name: z.string().min(3).max(255),
    last_name: z.string().min(3).max(255),
    email: z.string().email().max(255),
    phone_code: z.string().regex(/^[0-9]{1,3}$/),
    phone_number: z.string().regex(/^[0-9]{4,12}$/),
  })

  private static addressCreateFullZodValidationSchema = z.object({
    street: z.string().min(3).max(255),
    city: z.string().min(3).max(255),
    country: z.string().min(3).max(255),
    postal_code: z.string().regex(/^[0-9]{5}$/),
  })

  private static shippingCreateFullZodValidationSchema = z.object({
    description: z.string().min(3).max(1000),
    charge: z.coerce.number().nonnegative().lt(1e15),
    free: z.coerce.boolean().optional(),
    estimated_days: z.coerce.number().int().nonnegative().lte(8),
  })

  static userAddrCreateFullZodValidationSchema =
    this.userCreateFullZodValidationSchema.extend({
      address: this.addressCreateFullZodValidationSchema,
    })

  static userAddrProdCreateFullZodValidationSchema =
    this.userCreateFullZodValidationSchema.extend({
      addresses: z.array(this.addressCreateFullZodValidationSchema).nonempty(),
      product: this.productCreateFullZodValidationRefinedSchema,
    })

  static userAddrProdShipCreateFullZodValidationSchema =
    this.userAddrProdCreateFullZodValidationSchema.extend({
      shipping: this.shippingCreateFullZodValidationSchema,
    })
}
