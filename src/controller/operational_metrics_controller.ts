import type { Response } from "express";
import type { AuthRequest } from "../interface/types.js";
import * as OperationalMetricsService from "../service/operational_metrics_service.js"

export async function operational_metrics_getInfo_controller(req:AuthRequest,res:Response) {
    const result = await OperationalMetricsService.operational_metrics_getInfo_service(req)
    return res.status(result.status || 200).json(result);
}

