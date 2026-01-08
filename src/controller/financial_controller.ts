import type { Response } from "express";
import type { AuthRequest } from "../interface/types.js";
import * as FinacialService from "../service/financial_service.js"

export async function financial_getInfo_controller(req:AuthRequest,res:Response) {
    const data = await FinacialService.financial_getInfo_service(req)
   return res.status(data.status || 200).json(data);
}

