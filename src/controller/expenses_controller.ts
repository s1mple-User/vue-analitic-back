
import type { Request, Response } from "express"
import type { AuthRequest } from "../interface/types.js"
import * as expensesService from "../service/expenses_service.js"

export async function expensesCreate_contller(req:Request,res:Response) {
    const data = await expensesService.expensesCreate_service(req)
     return res.status(data.status).json(data);
}

export async function expensesDelete_contller(req:Request,res:Response) {
    const data = await expensesService.expensesDelete_service(req)
     return res.status(data.status).json(data);
}
