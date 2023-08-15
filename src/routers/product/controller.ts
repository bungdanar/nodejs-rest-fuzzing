import { Request, Response } from 'express'
import { ProductCreatePayload } from '../../data-type/product'
import { Product } from '../../models/init-models'

export class ProductController {
  static create = async (req: Request, res: Response) => {
    const payload = req.body as ProductCreatePayload

    const product = await Product.create(payload)

    return res.status(200).send(product)
  }
}
