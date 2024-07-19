import { ProductService, ProductType } from "../types/product";
import response from "../utils/response";

const productService: ProductService = {
    updateProduct
}

async function updateProduct(data: ProductType) {
    return response.success('Product updated successfully', data)
}

export default productService