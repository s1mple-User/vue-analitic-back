import type { Request, Response } from "express";
import * as AuthService from "../service/auth_service.js";


export async function register_contller(req:Request,res:Response) {
    const data = await AuthService.register_service(req)
   return res.status(data.status || 200).json(data);
} 

export async function login_contller(req:Request,res:Response) {
    const data = await AuthService.login_service(req)
    return res.status(data.status).json(data);
} 

export async function getAccses_contller(req:Request,res:Response) {
    const data = await AuthService.get_access(req)
    return res.status(data.status).json(data);
}