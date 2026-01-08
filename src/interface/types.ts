import type { Request } from "express";
import type { Document, Schema, Types } from "mongoose"; 
import type { ICompany } from "./company.js";
/**
 * Document — интерфейс Mongoose, который добавляет системные поля (напр. ._id, .save()).
 * Schema — используется для типизации специальных типов MongoDB, таких как ObjectId.
 */

// 1. ИНТЕРФЕЙС ПОЛЬЗОВАТЕЛЯ
// Описывает владельца бизнеса. Наследует Document, так как это отдельная коллекция в БД.
export enum UserRole {
  ADMIN = "ADMIN",
  OWNER = "OWNER",
  EMPLOYEE = "EMPLOYEE"
}

export interface IUser extends Document {
  email: string;
  password: string; 
  name: string;
  role:UserRole
  refreshToken?: string;
  accsesToken?: string;
}

// 2. ИНТЕРФЕЙС СОТРУДНИКА
// Вспомогательный интерфейс (Sub-interface). Описывает данные работника для расчета эффективности и затрат.
export interface IEmployee {
user:IUser;
  role?: string;          // Роль: например, "Сварщик", "Администратор"
  salary: number;        // Фиксированная ставка или оклад
  efficiency: number;    // Процент выполнения плана (0-100%)
}

// 3. ИНТЕРФЕЙС ПРОДУКТА
// Описывает товар или услугу. Помогает вычислить чистую маржу с каждой продажи.
export interface IProduct {
  company:Types.ObjectId | any | null;
  title: string;
  price: number;                // Розничная цена
  spend_time_to_create: number; // Трудозатраты в единицах времени
  spend_money_to_create: number; // Себестоимость материалов (сырье)
  amount:number;
}

// 4. ИНТЕРФЕЙС РАСХОДОВ
// Описывает разовые или регулярные траты бизнеса (аренда, реклама, налоги).
export interface IExpenses {
  title: string;
  price: number;
}

// 5. ФИНАНСОВЫЕ ПОКАЗАТЕЛИ
// Агрегированный объект, который собирает все денежные итоги в один блок.
export interface IFinancialMetrics {
  revenue: number;        // Общая выручка (сколько денег пришло)
  netProfit: number;      // Чистая прибыль (выручка минус все расходы)
  margin: number;         // Рентабельность (прибыль / выручка * 100)
  expenses: number;  // Детализация прочих расходов
  cashFlow: number;       // "Живые деньги" (разница между приходом и уходом наличности)
  totalPayroll: number;   // ФОТ (Фонд Оплаты Труда) — сумма всех зарплат из IEmployee
}

export interface AuthRequest extends Request {
    user?: {
        id: Types.ObjectId;
    };
}