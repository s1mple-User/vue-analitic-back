// 7. ГЛАВНЫЙ ИНТЕРФЕЙС АНАЛИТИКИ

import type { Schema, Types } from "mongoose";
import type { IEmployee, IExpenses, IFinancialMetrics, IProduct } from "./types.js";

// Это "корень" документа, который связывает финансы, операции и конкретного пользователя.
export interface IAnalytics extends Document {
  userId: Schema.Types.ObjectId; // Ссылка на ID пользователя-владельца
  finance: IFinancialMetrics;    // Вложенный объект с финансовыми данными
  operations: IOperationalMetrics; // Вложенный объект с операционными данными
  lastUpdated: Date;             // Метка времени последнего обновления отчета
}


export interface ICompany extends Document {
  title: string;                 // Название компании
  description?: string;          // Описание деятельности
  
  // Владелец компании (ссылка на IUser)
  ownerId:Types.ObjectId; 

  // Ресурсы компании (массивы данных)
  employees: IEmployee[];        // Список штатных сотрудников
  products: IProduct[];          // Каталог товаров или услуг
  expenses: IExpenses[];         // Список текущих расходов (аренда, налоги и т.д.)

  // Связь с аналитикой
  // Можно хранить ID последнего отчета или массив ссылок на историю отчетов
  analyticsId?: Schema.Types.ObjectId; 

  // Метаданные
  industry?: string;             // Сфера (например, "Производство", "IT", "Ритейл")
  createdAt: Date;
  updatedAt: Date;
}

// 6. ОПЕРАЦИОННЫЕ ПОКАЗАТЕЛИ
// Данные о внутренних процессах компании: склад, заказы и команда.
export interface IOperationalMetrics {
  inventoryLevel: number;    // Загруженность склада или остатки товаров
  turnoverDays: number;      // Оборачиваемость (за сколько дней в среднем продается товар)
  totalOrders: number;       // Количество совершенных сделок
  cogs: number;              // (Cost of Goods Sold) — полная себестоимость всех проданных товаров
  products: number;      // Каталог товаров/услуг
  employees: number;    // Штат сотрудников
}
