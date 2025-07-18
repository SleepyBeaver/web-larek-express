import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import path from 'path';
import { errors } from 'celebrate';
import config from './config';
import orderRouter from './routes/order';
import productRouter from './routes/product';
import errorHandler from './middlewares/errorHandler';
import { requestLogger, errorLogger, appLogger } from './middlewares/logger';
import NotFoundError from './errors/notFoundError';

const app = express();

mongoose.connect(config.DB_ADDRESS)
  .catch((error) => {
    appLogger.error('Ошибка подключения к MongoDB', { message: error.message, stack: error.stack });
  });

app.use(cors({
  origin: config.ORIGIN_ALLOW,
}));

app.use(express.json());

app.use(requestLogger);

app.use(express.static(path.join(__dirname, 'public')));

app.use('/product', productRouter);
app.use('/order', orderRouter);

app.use((_req, _res, next) => {
  next(new NotFoundError('Маршрут не найден'));
});

app.use(errorLogger);

app.get('/', (_req, res) => {
  res.send('Сервер работает!');
});

app.use(errors());
app.use(errorHandler);

app.listen(config.PORT);
