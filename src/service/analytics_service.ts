import type { AuthRequest } from "../interface/types.js";
import { Analytics } from "../models/analytics.js";
import { Company } from "../models/company.js";

export async function analyticsGetInfo_service(req: AuthRequest) {
    try {
        const userId = req.user?.id;
        if (!userId) return { status: 401, message: "Не авторизован" };

        const { title } = req.body;
        if (!title) return { status: 400, message: "Название компании не указано" };

        const company = await Company.findOne({ title }).exec();
        if (!company) {
            return { status: 404, message: "Компания не найдена" };
        }

        const totalPayroll = (company.employees || []).reduce((sum, emp) => sum + (emp.salary || 0), 0);
        const otherExpenses = (company.expenses || []).reduce((sum, exp) => sum + (exp.price || 0), 0);
        
        const products = company.products || [];
        const revenue = products.reduce((sum, prod) => sum + (prod.price * (prod.amount || 0)), 0);
        const cogs = products.reduce((sum, prod) => sum + (prod.spend_money_to_create * (prod.amount || 0)), 0);
        
        const totalExpenses = otherExpenses + totalPayroll + cogs;
        const netProfit = revenue - totalExpenses;

        const finance = {
            revenue,
            netProfit,
            margin: revenue > 0 ? (netProfit / revenue) * 100 : 0,
            expenses: otherExpenses,
            cashFlow: netProfit, 
            totalPayroll
        };

        const operations = {
            inventoryLevel: products.reduce((sum, prod) => sum + (prod.amount || 0), 0),
            turnoverDays: 30,
            totalOrders: 0,   
            cogs,
            products: products.length,
            employees: (company.employees || []).length
        };

        const report = await Analytics.findOneAndUpdate(
            { _id: userId }, 
            {
                userId,
                finance,
                operations,
                lastUpdated: new Date()
            },
            { upsert: true, new: true, runValidators: true }
        );

        return { status: 200, data: report };

    } catch (error) {
        console.error("Analytics Error:", error);
        return { status: 500, message: error instanceof Error ? error.message : "Ошибка сервера" };
    }
}