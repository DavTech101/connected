import { TErrorResponse } from '@Types/errors';
import { NextFunction, Request, Response } from 'express';

//###########################################################################################
//##### NOT FOUND ERROR HANDLER
//###########################################################################################
export const notFound = (req: Request, res: Response, next: NextFunction) => {
  const error: TErrorResponse = new Error(`Not Found - ${req.originalUrl}`);
  res.status(404);
  next(error);
};

//###########################################################################################
//##### ERROR HANDLER
//###########################################################################################
export const errorHandler = (
  error: Error,
  req: Request,
  res: Response<TErrorResponse>,
  next: NextFunction
) => {
  const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  res.status(statusCode);
  res.json({
    message: error.message,
    stack: process.env.NODE_ENV === 'production' ? 'PROD Error' : error.stack,
  });
};
