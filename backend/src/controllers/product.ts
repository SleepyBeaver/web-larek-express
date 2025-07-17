import { Request, Response, NextFunction } from 'express';
import Product from '../models/product';
import BadRequestError from '../errors/badRequestError';
import ConflictError from '../errors/conflictError';
import { Error as MongooseError } from 'mongoose';

export const getProducts = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const products = await Product.find();
    res.json({
      items: products,
      total: products.length,
    });
  } catch (err) {
    next(err);
  }
};

export const createProduct = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const product = await Product.create(req.body);
    res.status(201).json(product);
  } catch (err: any) {
    if (err instanceof MongooseError.ValidationError) {
      return next(new BadRequestError('Ошибка валидации данных при создании товара'));
    }

    if (err.message.includes('E11000')) {
      return next(new ConflictError('Товар с таким названием уже существует'));
    }

    next(err);
  }
};
