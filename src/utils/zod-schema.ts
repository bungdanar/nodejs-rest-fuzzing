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

  static productTagCategoryCreatePartialZodValidationSchema =
    this.productCreatePartialZodValidationSchema.extend({
      tags: this.tagCreatePartialZodValidationSchema,
      category: this.categoryCreatePartialZodValidationSchema,
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

  static refineProductCreateSchema = (
    schema: typeof this.productCreateFullZodValidationSchema
  ) =>
    schema.refine((data) => data.discount_price <= data.regular_price, {
      path: ['discount_price'],
      message: 'Must be less than or equal to regular_price',
    })
}
