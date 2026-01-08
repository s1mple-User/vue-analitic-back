import jwt from 'jsonwebtoken';

const SECRET_KEY = 'KEY';

export const generateAccsesToken = (userId:string) =>{
   return jwt.sign({id:userId},SECRET_KEY,{expiresIn:"1h"})
}

export const generateRefreshToken = (userId:string) =>{
   return jwt.sign({id:userId},SECRET_KEY,{expiresIn:"30d"})
}



export const verifyToken = (token:string) =>{
    try {
        return jwt.verify(token, SECRET_KEY);
    } catch (err) {
        return null;
    }
}