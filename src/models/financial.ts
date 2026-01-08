import { model, Schema } from "mongoose";

import { expensesSchema } from "./expenses.js";
import type { IFinancialMetrics } from "../interface/types.js";



export const FinancialMetricsSchema: Schema<IFinancialMetrics> = new Schema<IFinancialMetrics>({
    revenue:{
        type:Number,
        required:true
    },
    netProfit:{
        type:Number,
        required:true
    },
    expenses:{
        type: Number,
        required:false,
        default: 0
    },
    cashFlow:{  
        type:Number,
        required:true
    },
    totalPayroll:{
        type:Number,
        required:true
    },
});

export const FinancialMetrics = model<IFinancialMetrics>('FinancialMetrics', FinancialMetricsSchema);