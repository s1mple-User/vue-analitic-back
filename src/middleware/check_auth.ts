import type { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

const SECRET_KEY = "KEY"; 

export function chek_auth(req: Request, res: Response, next: NextFunction) {

    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.status(401).json({ message: "отсутствует токен или просрочен" });
    }
    
    const token = authHeader.split(" ")[1];
    if (!token) {
         return res.status(401).json({ message: "Нет токена" });
    }
    try {
      
        const decoded = jwt.verify(token.toString(), SECRET_KEY);
        
        (req as any).user = decoded;

        next(); 
    } catch (error) {
        return res.status(403).json({ message: "Не авторизован: неверный токен" });
    }
}