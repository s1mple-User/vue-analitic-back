import { model, Schema } from "mongoose";
import type { IOperationalMetrics } from "../interface/company.js";


export const OperationalMetricsSchema:Schema<IOperationalMetrics>  = new Schema<IOperationalMetrics>({
    inventoryLevel:{
        type:Number,
        required:true,
        default: 0
    },
    turnoverDays:{
        type:Number,
        required:true,
        default: 0
    },
    totalOrders:{
        type:Number,
        required:true,
        default: 0
    },
      cogs:{
        type:Number,
        required:true,
        default: 0
    },
      products:{
        type:Number,
        required:true,
        default: 0
    },
      employees:{
        type:Number,
        required:true,
        default: 0
    }
})
export const OperationalMetrics = model<IOperationalMetrics>('OperationalMetrics', OperationalMetricsSchema);