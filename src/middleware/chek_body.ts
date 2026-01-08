import type { NextFunction, Request, Response } from "express";

export function chek_body(req: Request, res: Response, next: NextFunction) {

    if (!req.body || Object.keys(req.body).length === 0) {
        return res.status(400).json({ 
            message: "Ошибка: Тело запроса пустое (body empty)" 
        });
    }
    next();
}