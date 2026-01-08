import { model, Schema } from "mongoose";
import { employeeSchema } from "./employee.js";
import { productSchema } from "./product.js";
import type { ICompany } from "../interface/company.js";

const companySchema = new Schema<ICompany>({
    title: {
        type: String,
        required: true,
        unique: true, 
        trim: true
    },
    description: {
        type: String,
        required: false
    },
    ownerId: {
        type: Schema.Types.ObjectId,
        ref: 'User', 
        required: true
    },
    
 employees: {
    type: [employeeSchema],
    required: false
},

    products:{
    type: [productSchema],
    required: false
    } ,
    
    industry: {
        type: String,
        required: false
    }
}, { timestamps: true }); 

export const Company = model<ICompany>('Company', companySchema);