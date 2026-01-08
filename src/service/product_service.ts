import type { Request } from "express";
import type { AuthRequest } from "../interface/types.js";
import { Product } from "../models/product.js";
import { Company } from "../models/company.js";

export async function productCreate_service(req:AuthRequest) {
    try {
     
    const owner = req.user?.id
    const {title,amount,spend_money_to_create,price,spend_time_to_create,company} = req.body

    if (!title || !company) {
         return { status: 400, message: "чего то нет" };
    }

    const companyData = await Company.findOne({ title: company });

   if (!companyData) {
            return { status: 404, message: "Компания не найдена" };
        }

    const data = await Product.create({
        amount,
        company:companyData._id,
        spend_money_to_create,
        price,
        title,
        spend_time_to_create,
    }) 

     return { status: 201, data };

    } catch (error) {
        return { status: 500, message: `${error}` };
    }
}

export async function productDelete_service(req:Request) {
    try {
    const {productId} = req.body

    if (!productId) {
         return { status: 400, message: "не найдена productId" };
    }
    
    const data = await Product.findOneAndDelete({_id:productId})

    return { status: 200, data };
    } catch (error) {
    return { status: 500, message: `${error}` };
    }
}