import { model, Schema } from "mongoose";
import { OperationalMetricsSchema } from "./operational_metrics.js";
import { FinancialMetricsSchema } from "./financial.js";
import type { IAnalytics } from "../interface/company.js";

export const analyticsSchema = new Schema<IAnalytics>({
    userId: { 
        type: Schema.Types.ObjectId, 
        ref: 'User', 
        required: true ,
        index: true
    },
    finance: { 
        type: FinancialMetricsSchema, 
        required: true,
        default: () => ({})
    },
    operations: { 
        type: OperationalMetricsSchema, 
        required: true,
        default: () => ({})
    },
    lastUpdated: { 
        type: Date, 
        default: Date.now 
    }
}, {
    timestamps: true 
});

export const Analytics = model<IAnalytics>('Analytics', analyticsSchema);