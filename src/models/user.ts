import { model, Schema } from "mongoose";
import { UserRole, type IUser } from "../interface/types.js";

export const userSchema: Schema<IUser> = new Schema<IUser>({
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true
    },
    password: {
        type: String,
        required: true,
    },
    name: { 
        type: String, 
        required: true 
    },
    role: {
        type: String,
        required: true,
        enum: Object.values(UserRole), 
        default: UserRole.EMPLOYEE
    }
});

export const User = model<IUser>('User', userSchema);