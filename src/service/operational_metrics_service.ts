import type { AuthRequest } from "../interface/types.js";
import { Company } from "../models/company.js";
import { Analytics } from "../models/analytics.js";

export async function operational_metrics_getInfo_service(req: AuthRequest) {
    const userId = req.user?.id;
    const { title } =req.body
    if (!title) {
        throw new Error("company не найден ");
    }

    const company = await Company.findOne({ title:title }).exec()

    if (!company) {
        throw new Error("Компания не найдена. Сначала создайте профиль компании.");
    }
    const inventoryLevel = company.products.reduce((sum, prod) => sum + (prod.amount || 0), 0);
    const cogs = company.products.reduce((sum, prod) => 
        sum + (prod.spend_money_to_create * (prod.amount || 0)), 0
    );

    const operationalData = {
        inventoryLevel,
        turnoverDays: 30, 
        totalOrders: 0,   
        cogs,
        products: company.products.length,
        employees: company.employees.length
    };

    const updatedAnalytics = await Analytics.findOneAndUpdate(
        { _id: userId },
        { 
            $set: { 
                operations: operationalData,
                lastUpdated: new Date() 
            } 
        },
        { upsert: true, new: true }
    );

    return {status:200,data:updatedAnalytics.operations};
}