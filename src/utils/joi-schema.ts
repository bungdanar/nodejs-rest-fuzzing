import Joi from 'joi'
import {
  CategoryCreatePayload,
  CouponCreatePayload,
  ProductCreatePayload,
  ProductTagCategoryCouponCreatePayload,
  ProductTagCategoryCreatePayload,
} from '../data-type/product'
import {
  AddressCreatePayload,
  UserAddressCreatePayload,
  UserAddressProductCreatePayload,
  UserCreatePayload,
} from '../data-type/user'

export class JoiSchemaUtility {
  private static plainProductCreatePartialJoiValidation: Partial<
    Record<keyof ProductCreatePayload, Joi.Schema>
  > = {
    name: Joi.string().required(),
    sku: Joi.string().required(),
    regular_price: Joi.number().required(),
    discount_price: Joi.number().required(),
    quantity: Joi.number().integer().required(),
    description: Joi.string().required(),
    weight: Joi.number().required(),
    note: Joi.string().required(),
    published: Joi.boolean(),
  }

  private static plainTagCreatePartialJoiValidation = Joi.array()
    .items(Joi.string().required())
    .required()

  private static plainCategoryCreatePartialJoiValidation: Partial<
    Record<keyof CategoryCreatePayload, Joi.Schema>
  > = {
    name: Joi.string().required(),
    description: Joi.string().required(),
  }

  private static plainCouponCreatePartialJoiValidation: Partial<
    Record<keyof CouponCreatePayload, Joi.Schema>
  > = {
    code: Joi.string().required(),
    description: Joi.string().required(),
    discount_value: Joi.number().required(),
    discount_type: Joi.string().required(),
    times_used: Joi.number().integer(),
    max_usage: Joi.number().integer().required(),
    start_date: Joi.date().iso().required(),
    end_date: Joi.date().iso().required(),
  }

  private static plainUserCreatePartialJoiValidation: Partial<
    Record<keyof UserCreatePayload, Joi.Schema>
  > = {
    first_name: Joi.string().required(),
    last_name: Joi.string().required(),
    email: Joi.string().required(),
    phone_code: Joi.string().required(),
    phone_number: Joi.string().required(),
  }

  private static plainAddressCreatePartialJoiValidation: Partial<
    Record<keyof AddressCreatePayload, Joi.Schema>
  > = {
    street: Joi.string().required(),
    city: Joi.string().required(),
    country: Joi.string().required(),
    postal_code: Joi.string().required(),
  }

  private static plainProductCreateFullJoiValidation: Partial<
    Record<keyof ProductCreatePayload, Joi.Schema>
  > = {
    name: Joi.string().min(3).max(255).required(),
    sku: Joi.string().min(3).max(255).required(),
    regular_price: Joi.number().precision(4).min(0).required(),
    discount_price: Joi.number()
      .precision(4)
      .min(0)
      .max(Joi.ref('regular_price'))
      .required(),
    quantity: Joi.number().integer().min(0).max(9999).required(),
    description: Joi.string().min(3).max(1000).required(),
    weight: Joi.number().precision(4).min(0).max(1000).required(),
    note: Joi.string().min(3).max(255).required(),
    published: Joi.boolean(),
  }

  private static plainTagCreateFullJoiValidation = Joi.array()
    .items(Joi.string().min(3).max(255).required())
    .required()

  private static plainCategoryCreateFullJoiValidation: Partial<
    Record<keyof CategoryCreatePayload, Joi.Schema>
  > = {
    name: Joi.string().min(3).max(255).required(),
    description: Joi.string().min(3).max(1000).required(),
  }

  private static plainCouponCreateFullJoiValidation: Partial<
    Record<keyof CouponCreatePayload, Joi.Schema>
  > = {
    code: Joi.string().min(3).max(255).required(),
    description: Joi.string().min(3).max(1000).required(),
    discount_value: Joi.number().precision(2).min(0).max(100).required(),
    discount_type: Joi.string().min(3).max(255).required(),
    times_used: Joi.number().integer().min(0).max(Joi.ref('max_usage')),
    max_usage: Joi.number().integer().min(0).required(),
    start_date: Joi.date().iso().required(),
    end_date: Joi.date().iso().min(Joi.ref('start_date')).required(),
  }

  private static plainUserCreateFullJoiValidation: Partial<
    Record<keyof UserCreatePayload, Joi.Schema>
  > = {
    first_name: Joi.string().min(3).max(255).required(),
    last_name: Joi.string().min(3).max(255).required(),
    email: Joi.string().email().max(255).required(),
    phone_code: Joi.string()
      .pattern(/^[0-9]{1,3}$/)
      .required(),
    phone_number: Joi.string()
      .pattern(/^[0-9]{4,12}$/)
      .required(),
  }

  private static plainAddressCreateFullJoiValidation: Partial<
    Record<keyof AddressCreatePayload, Joi.Schema>
  > = {
    street: Joi.string().min(3).max(255).required(),
    city: Joi.string().min(3).max(255).required(),
    country: Joi.string().min(3).max(255).required(),
    postal_code: Joi.string()
      .pattern(/^[0-9]{5}$/)
      .required(),
  }

  static productCreatePartialJoiValidationSchema =
    Joi.object<ProductCreatePayload>({
      ...this.plainProductCreatePartialJoiValidation,
    }).required()

  static productTagCategoryCreatePartialJoiValidationSchema =
    Joi.object<ProductTagCategoryCreatePayload>({
      ...this.plainProductCreatePartialJoiValidation,
      tags: this.plainTagCreatePartialJoiValidation,
      category: Joi.object<CategoryCreatePayload>({
        ...this.plainCategoryCreatePartialJoiValidation,
      }).required(),
    }).required()

  static productTagCategoryCouponCreatePartialJoiValidationSchema =
    Joi.object<ProductTagCategoryCouponCreatePayload>({
      ...this.plainProductCreatePartialJoiValidation,
      tags: this.plainTagCreatePartialJoiValidation,
      categories: Joi.array()
        .items(
          Joi.object<CategoryCreatePayload>({
            ...this.plainCategoryCreatePartialJoiValidation,
          }).required()
        )
        .required(),
      coupons: Joi.array()
        .items(
          Joi.object<CouponCreatePayload>({
            ...this.plainCouponCreatePartialJoiValidation,
          }).required()
        )
        .required(),
    })

  static userCreatePartialJoiValidationSchema = Joi.object<UserCreatePayload>({
    ...this.plainUserCreatePartialJoiValidation,
  }).required()

  static userAddrCreatePartialJoiValidationSchema =
    Joi.object<UserAddressCreatePayload>({
      ...this.plainUserCreatePartialJoiValidation,
      address: Joi.object<AddressCreatePayload>({
        ...this.plainAddressCreatePartialJoiValidation,
      }).required(),
    }).required()

  static userAddrProdCreatePartialJoiValidationSchema =
    Joi.object<UserAddressProductCreatePayload>({
      ...this.plainUserCreatePartialJoiValidation,
      addresses: Joi.array()
        .items(
          Joi.object<AddressCreatePayload>({
            ...this.plainAddressCreatePartialJoiValidation,
          }).required()
        )
        .required(),
      product: Joi.object<ProductCreatePayload>({
        ...this.plainProductCreatePartialJoiValidation,
      }).required(),
    }).required()

  static productCreateFullJoiValidationSchema =
    Joi.object<ProductCreatePayload>({
      ...this.plainProductCreateFullJoiValidation,
    }).required()

  static productTagCategoryCreateFullJoiValidationSchema =
    Joi.object<ProductTagCategoryCreatePayload>({
      ...this.plainProductCreateFullJoiValidation,
      tags: this.plainTagCreateFullJoiValidation,
      category: Joi.object<CategoryCreatePayload>({
        ...this.plainCategoryCreateFullJoiValidation,
      }).required(),
    }).required()

  static productTagCategoryCouponCreateFullJoiValidationSchema =
    Joi.object<ProductTagCategoryCouponCreatePayload>({
      ...this.plainProductCreateFullJoiValidation,
      tags: this.plainTagCreateFullJoiValidation,
      categories: Joi.array()
        .items(
          Joi.object<CategoryCreatePayload>({
            ...this.plainCategoryCreateFullJoiValidation,
          }).required()
        )
        .required(),
      coupons: Joi.array()
        .items(
          Joi.object<CouponCreatePayload>({
            ...this.plainCouponCreateFullJoiValidation,
          }).required()
        )
        .required(),
    })

  static userCreateFullJoiValidationSchema = Joi.object<UserCreatePayload>({
    ...this.plainUserCreateFullJoiValidation,
  }).required()

  static userAddrCreateFullJoiValidationSchema =
    Joi.object<UserAddressCreatePayload>({
      ...this.plainUserCreateFullJoiValidation,
      address: Joi.object<AddressCreatePayload>({
        ...this.plainAddressCreateFullJoiValidation,
      }).required(),
    }).required()

  static userAddrProdCreateFullJoiValidationSchema =
    Joi.object<UserAddressProductCreatePayload>({
      ...this.plainUserCreateFullJoiValidation,
      addresses: Joi.array()
        .items(
          Joi.object<AddressCreatePayload>({
            ...this.plainAddressCreateFullJoiValidation,
          }).required()
        )
        .required(),
      product: Joi.object<ProductCreatePayload>({
        ...this.plainProductCreateFullJoiValidation,
      }).required(),
    }).required()
}
