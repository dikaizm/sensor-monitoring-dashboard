import { Request, Response } from "express";
import { ApiResponse } from "../utils/response";

interface ProductService {
    updateProduct: (data: ProductType) => Promise<ApiResponse>
}

interface ProductController {
    updateProduct: (req: Request, res: Response) => void
}

interface ProductType {
    id: number
    name: string
    quantity: number
    date: string
}