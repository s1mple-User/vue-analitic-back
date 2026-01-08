import { model, Schema } from "mongoose";
import type { IEmployee } from "../interface/types.js";
 
export const employeeSchema:Schema<IEmployee> =new Schema<IEmployee>({
    user: {
       type: Schema.Types.ObjectId,
        ref: 'User', 
        required: true
    },
    role:{
        type:String,
        required:false
    },
    salary:{
        type:Number,
        required:false
    },
    efficiency:{
       type:Number,
       required:false
    }
})  
export const Employee = model<IEmployee>('Employee', employeeSchema);