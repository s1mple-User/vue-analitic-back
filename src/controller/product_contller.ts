
import type { Request, Response } from "express"
import type { AuthRequest } from "../interface/types.js"
import * as productService from "../service/product_service.js"

export async function productCreate_contller(req:AuthRequest,res:Response) {
    const result = await productService.productCreate_service(req)
    return res.status(result.status || 200).json(result);
}

export async function productDelete_contller(req:Request,res:Response) {
    const result = await productService.productDelete_service(req)
    return res.status(result.status || 200).json(result);
}
