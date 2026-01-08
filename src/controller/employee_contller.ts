
import type { Response } from "express";
import type { AuthRequest } from "../interface/types.js"
import * as EmployeedService from "../service/employee_service.js"

export async function employeeAdd_contller(req:AuthRequest,res:Response) {
    const data = await EmployeedService.employeeAdd_service(req)
     return res.status(data.status).json(data);
}

export async function employeeDelete_contller(req:AuthRequest,res:Response) {
    const data = await EmployeedService.employeeDelete_service(req)
    return res.status(data.status).json(data);
}