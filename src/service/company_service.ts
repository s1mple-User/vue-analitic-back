import type { Request } from "express";
import { json } from "node:stream/consumers"
import jwt from "jsonwebtoken"
import { Company } from "../models/company.js";
import { Types } from "mongoose";
import type { AuthRequest } from "../interface/types.js";

export async function create_company_service(req: AuthRequest) {
    try {

        const { title, description, industry } = req.body || {};
        const ownerId = req.user?.id;
        
        if (!ownerId) {
            return { status: 401, message: "Доступ запрещен: владелец не определен" };
        }

        if (!title) {
            return { status: 400, message: "Название компании обязательно" };
        }

        const company = await Company.findOne({ title });
        if (company) {
            return { status: 400, message: "У нас уже есть компания с таким названием" };
        }
        

        const newCompany = await Company.create({
            title,
            description,
            industry,
            ownerId 
        });
        
        return { 
            status: 201, 
            message: "Компания создана успешно", 
            data: newCompany 
        };

    } catch (error: any) {
        if (error.name === 'JsonWebTokenError') {
            return { status: 401, message: "Неверный токен" };
        }
        console.error(error);
        return { status: 500, message: "Ошибка сервера при создании компании" };
    }
}

export async function delete_company_service(req:AuthRequest) {
    try {
    const ownerId = req.user?.id
    const {title} = req.body
    const company = await Company.findOne({ title })
    if (!company || !ownerId) {
        return {"message":"не удалось удалить компанию"}
    }
   
    const deletedCompany = await Company.findOneAndDelete({ title: company?.title, ownerId: ownerId })
    if (!deletedCompany) {
            return { status: 404, message: "Компания не найдена или у вас нет прав на её удаление" };
        } 
     return { 
            status: 200, 
            message: "Компания успешно удалена", 
            data: deletedCompany 
        };   
    } catch (error) {
        console.error("Ошибка при удалении:", error);
        return { status: 500, message: "Ошибка сервера" };
    }
} 

export async function update_company_service(req: AuthRequest) {
    try {
        const ownerId = req.user?.id;
        
        const { id, title, industry, description } = req.body; 

        if (!id || !ownerId) {
            return { status: 400, message: "ID компании и ID владельца обязательны" };
        }

        const updatedCompany = await Company.findOneAndUpdate(
            { _id: id, ownerId: ownerId }, 
            { $set: { title, industry, description } }, 
            { new: true, runValidators: true }  
        );

        if (!updatedCompany) {
            return { status: 404, message: "Компания не найдена или у вас нет прав на редактирование" };
        }

        return { 
            status: 200, 
            message: "Компания успешно обновлена", 
            data: updatedCompany 
        };   

    } catch (error: any) {
    
        if (error.code === 11000) {
            return { status: 400, message: "Компания с таким названием уже существует" };
        }
        console.error(error);
        return { status: 500, message: "Ошибка сервера при обновлении" };
    }
}
