import type { Request } from "express";
import { Expenses } from "../models/expenses.js";
import { AppError } from "../utils/appError.js";

export async function expensesCreate_service(req: Request) {
    const { title, price } = req.body;

    if (!title || !price) {
        throw new AppError("Пожалуйста, укажите название и цену", 400);
    }

    const newExpense = await Expenses.create({
        title,
        price
    });

    return { status: 201, data: newExpense };
}

export async function expensesDelete_service(req: Request) {
    const { expensesId } = req.body;

    if (!expensesId) {
        throw new AppError("ID расхода не передан", 400);
    }

    const expense = await Expenses.findByIdAndDelete(expensesId);

    if (!expense) {
        throw new AppError("Расход с таким ID не найден", 404);
    }

    return { status: 200, data: expense };
}