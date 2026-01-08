import type { Request, Response } from "express";
import * as analyticsService from "../service/analytics_service.js";


export async function analyticsGetInfo_controller(req:Request,res:Response) {
    const result = await analyticsService.analyticsGetInfo_service(req)
   return res.status(result.status || 200).json(result);
} 
