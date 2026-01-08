import type { Response } from "express"
import type { AuthRequest } from "../interface/types.js"
import * as CompanyService from "../service/company_service.js"

export async function create_company_contloler(req: AuthRequest, res: Response) {
    const result = await CompanyService.create_company_service(req);
    return res.status(result.status || 200).json(result);
} 

export async function delete_company_contloler(req: AuthRequest, res: Response) {
    const result = await CompanyService.delete_company_service(req);
    return res.status(result.status || 200).json(result);
} 

export async function update_company_contloler(req: AuthRequest, res: Response) {
    const result = await CompanyService.update_company_service(req);
    return res.status(result.status || 200).json(result);
}