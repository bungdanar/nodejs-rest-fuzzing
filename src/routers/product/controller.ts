import { Request, Response } from 'express'
import { ProductService } from '../../utils/product-service'

export class ProductController {
  static create = async (req: Request, res: Response) => {
    const product = await ProductService.create(req.body, null)

    return res.status(201).send(product)
  }
}
