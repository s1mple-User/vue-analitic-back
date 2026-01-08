import bcrypt from 'bcrypt';
import { User } from "../models/user.js";
import type { Request, Response } from 'express';
import { generateAccsesToken, generateRefreshToken } from '../config/jwt_auth.js';
import jwt from 'jsonwebtoken';


const saltRounds = 10;

export async function register_service(req: Request) {
    try {
        
        const { email, password, name } = req.body || {};

        if (!email || !password || !name) {
            return { status: 400, message: "Поля email, password и name обязательны" };
        }


        const candidate = await User.findOne({ email });
        if (candidate) {
            return { status: 400, message: "Пользователь с таким email уже существует" };
        }

        const hashedPassword = await bcrypt.hash(password, saltRounds);

        const newUser = await User.create({
            email,
            password: hashedPassword,
            name
        });

        
        const accessToken = generateAccsesToken(newUser.id);
        const refreshToken = generateRefreshToken(newUser.id);

        newUser.refreshToken = refreshToken; 
        await newUser.save();

        return { 
            status: 201, 
            message: "Пользователь успешно создан", 
            accessToken, 
            refreshToken, 
            userId: newUser._id 
        };
    } catch (error) {
        console.error("Критическая ошибка сервиса:", error);
        return { status: 500, message: "Ошибка при регистрации" };
    }
}


export async function login_service(req: Request) {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email });
        
        if (!user) {
            return { status: 401, message: "Неверный логин или пароль" };
        }

        const isMatch = await bcrypt.compare(password, user.password);
        
        if (!isMatch) {
            return { status: 401, message: "Неверный логин или пароль" };
        }
        console.log("Work");
        
        const accessToken = generateAccsesToken(user._id.toString());
        const refreshToken = generateRefreshToken(user._id.toString());

        user.refreshToken = refreshToken;


        return {
            status: 200,
            message: "Вход выполнен успешно",
            accessToken,
            refreshToken,
            user: {
                id: user._id,
                email: user.email,
                name: user.name,
                role: user.role
            }
        };

    } catch (error) {
        console.error(error);
        return { status: 500, message: "Ошибка при входе" };
    }
}

export async function get_access(req: Request) {
    try {
        const { refreshToken } = req.body;

        if (!refreshToken) {
            return { status: 401, message: "Токен не предоставлен" };
        }

        const userData = jwt.verify(refreshToken, 'KEY') as { id: string };
       
        const user = await User.findById(userData.id);
    
        
        if (!user || user._id.toString() !== userData.id) {
            return { status: 401, message: "Сессия невалидна. Войдите заново." };
        }

        const accessToken = generateAccsesToken(user.id);

        return {
            status: 200,
            accessToken
        };

    } catch (error) {
        return { status: 401, message: "Токен просрочен или неверный" };
    }
}