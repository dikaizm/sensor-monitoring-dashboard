import { Request, Response } from "express";
import { ProductController } from "../types/product";

const productController: ProductController = {
    updateProduct
}

async function updateProduct(req: Request, res: Response) {
    res.send('Update product')
}

export default productController