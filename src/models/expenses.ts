import { model, Schema } from "mongoose";
import { UserRole, type IExpenses, type IUser } from "../interface/types.js";

export const expensesSchema: Schema<IExpenses> = new Schema<IExpenses>({
  title:{
   type: String,
    required: [true, 'Название расхода обязательно'],
    trim: true
  },
  price:{
    type: Number,
    required: [true, 'Цена обязательна'],
    min: [0, 'Цена не может быть отрицательной']
  }
},{ timestamps: true });

export const Expenses = model<IExpenses>('Expenses', expensesSchema);