import type { NextFunction, Request, Response } from "express";


export const globalErrorHandler = (err: any, req: Request, res: Response, next: NextFunction) => {
  err.statusCode = err.statusCode || 500;

  if (err.name === 'CastError') err.message = `Invalid ID: ${err.value}`; 
  if (err.code === 11000) err.message = 'Duplicate field value entered'; 
  if (err.name === 'ValidationError') {
      const messages = Object.values(err.errors).map((el: any) => el.message);
      err.message = `Invalid input data: ${messages.join('. ')}`;
      err.statusCode = 400;
  }

  res.status(err.statusCode).json({
    status: 'error',
    message: err.message,
    stack: process.env.NODE_ENV === 'development' ? err.stack : undefined,
  });
};