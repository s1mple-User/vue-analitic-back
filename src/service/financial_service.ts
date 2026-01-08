import type { AuthRequest } from "../interface/types.js";
import { Analytics } from "../models/analytics.js";
import { Company } from "../models/company.js";

export async function financial_getInfo_service(req: AuthRequest) {
    const { title } = req.body;

    // 1. Убираем populate для тех полей, которых нет в схеме Company как ссылок
    // Оставляем только те, что точно являются ObjectId с ref
    const company = await Company.findOne({ title: title })
        .populate('employees.user') 
        .exec();

    if (!company) {
        throw new Error("Компания не найдена");
    }

    const employees = company.employees || [];
    const expenses = company.expenses || []; 
    const products =company.products || [];

    const totalPayroll = employees.reduce((sum, emp) => sum + (emp.salary || 0), 0);
    const otherExpenses = expenses.reduce((sum, exp: any) => sum + (exp.price || 0), 0);
    
    const revenue = products.reduce((sum, prod: any) => sum + ((prod.price || 0) * (prod.amount || 0)), 0);
    const cogs = products.reduce((sum, prod: any) => sum + ((prod.spend_money_to_create || 0) * (prod.amount || 0)), 0);
    
    const totalExpenses = otherExpenses + totalPayroll + cogs;
    const netProfit = revenue - totalExpenses;
    const margin = revenue > 0 ? (netProfit / revenue) * 100 : 0;


    const financialMetrics = {
        revenue,
        netProfit,
        margin,
        expenses: otherExpenses,
        cashFlow: netProfit, 
        totalPayroll
    };

    const operationalMetrics = {
        inventoryLevel: products.reduce((sum, p: any) => sum + (p.amount || 0), 0),
        turnoverDays: 30, 
        totalOrders: 0,   
        cogs,
        products: products.length,
        employees: employees.length
    };

    const analyticsReport = await Analytics.findOneAndUpdate(
        { _id: company._id }, 
        {
            finance: financialMetrics,
            operations: operationalMetrics,
            lastUpdated: new Date()
        },
        { upsert: true, new: true }
    );

    return { status: 200, data: analyticsReport };
}