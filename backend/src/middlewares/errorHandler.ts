import { Request, Response, NextFunction } from 'express';

export const errorHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const statusCode = err.statusCode || 500;
  const message =
    statusCode === 500
      ? 'На сервере произошла ошибка'
      : err.message;

  res.status(statusCode).json({ message });
};
