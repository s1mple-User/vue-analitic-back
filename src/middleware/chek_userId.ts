import type { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { Types } from "mongoose";
import type { AuthRequest } from "../interface/types.js";


export async function check_userId(req: AuthRequest, res: Response, next: NextFunction) {
    try {
        const authHeader = req.headers.authorization;
        const token = authHeader && authHeader.split(' ')[1]; 

        if (!token) {
            return res.status(401).json({ message: "Нет доступа: токен отсутствует" });
        }
        const decoded = jwt.verify(token, 'KEY') as { id: string };
        req.user = {
            id: new Types.ObjectId(decoded.id)
        };

        next();
    } catch (error) {
        return res.status(401).json({ message: "Неверный или просроченный токен" });
    }
}