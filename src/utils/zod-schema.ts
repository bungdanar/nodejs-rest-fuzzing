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

  static refineProductCreateSchema = (
    schema: typeof this.productCreateFullZodValidationSchema
  ) =>
    schema.refine((data) => data.discount_price <= data.regular_price, {
      path: ['discount_price'],
      message: 'Must be less than or equal to regular_price',
    })
}
