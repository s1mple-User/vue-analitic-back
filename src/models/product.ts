import { model, Schema } from "mongoose";
import type { IProduct } from "../interface/types.js";

export const productSchema = new Schema<IProduct>({
    company:{
        type: Schema.Types.ObjectId,
        ref: 'Company', 
        required: true
    },
    title: {
        type: String,
        required: true,
        trim: true
    },
    price: {
        type: Number,
        required: false,
        default: 0,
        min: 0 
    },
    spend_money_to_create: {
        type: Number,
        required: false,
        min: 0,
        default: 0
    },
    spend_time_to_create: {
        type: Number,
        required: false,
        min: 0,
        default: 0
    },
    amount: { 
        type: Number,
        required: false,
        default: 0
    }
},{
    timestamps: true
}); 

export const Product = model<IProduct>('Product', productSchema);