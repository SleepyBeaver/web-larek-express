import { Request, Response, NextFunction } from 'express';
import { faker } from '@faker-js/faker';
import Product from '../models/product';
import BadRequestError from '../errors/badRequestError';

const createOrder = async (req: Request, res: Response, next: NextFunction) => {
  const {
    items, total, payment, email, phone, address,
  } = req.body;

  try {
    if (!Array.isArray(items) || items.length === 0) {
      throw new BadRequestError('Поле items должно быть непустым массивом');
    }

    if (!['card', 'online'].includes(payment)) {
      throw new BadRequestError('Недопустимое значение payment');
    }

    if (!email || !/^\S+@\S+\.\S+$/.test(email)) {
      throw new BadRequestError('Невалидный email');
    }

    if (!phone || typeof phone !== 'string') {
      throw new BadRequestError('Поле phone обязательно');
    }

    if (!address || typeof address !== 'string') {
      throw new BadRequestError('Поле address обязательно');
    }

    const products = await Product.find({ _id: { $in: items } });

    if (products.length !== items.length) {
      throw new BadRequestError('Один или несколько товаров не найдены');
    }

    const unavailable = products.find((p) => p.price === null);
    if (unavailable) {
      throw new BadRequestError(`Товар "${unavailable.title}" не продаётся (price = null)`);
    }

    const calculatedTotal = products.reduce((sum, p) => sum + (p.price || 0), 0);

    if (calculatedTotal !== total) {
      throw new BadRequestError(`Неверная сумма total. Ожидалось: ${calculatedTotal}`);
    }

    const orderId = faker.string.uuid();

    return res.status(201).json({
      id: orderId,
      total: calculatedTotal,
    });
  } catch (err) {
    return next(err); // добавляем return
  }
};

export default createOrder; // используем default экспорт
