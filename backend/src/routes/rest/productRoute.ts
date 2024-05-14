import { Router } from "express";
import productController from "../../controllers/ProductController";

const router = Router()

router.put('/update/:id', productController.updateProduct)

export default router