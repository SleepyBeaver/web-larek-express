import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import path from 'path';
import config from './config';
import orderRouter from './routes/order';
import productRouter from './routes/product';
import { errorHandler } from './middlewares/errorHandler';
import { requestLogger, errorLogger } from './middlewares/logger';
import { errors } from 'celebrate';

const app = express();

mongoose.connect(config.DB_ADDRESS)
  .then(() => console.log('Успешное подключение к MongoDB'))
  .catch((error) => console.error('Ошибка подключения к MongoDB:', error));

app.use(cors({
  origin: config.ORIGIN_ALLOW,
}));

app.use(express.json());

app.use(requestLogger);

app.use(express.static(path.join(__dirname, 'public')));

app.use('/product', productRouter);
app.use('/order', orderRouter);

app.use(errorLogger);

app.get('/', (req, res) => {
  res.send('Сервер работает!');
});

app.use((req, res, next) => {
  const NotFoundError = require('./errors/notFoundError').default;
  next(new NotFoundError('Маршрут не найден'));
});

app.use(errors());
app.use(errorHandler);

app.listen(config.PORT, () => {
  console.log(`Сервер запущен на http://localhost:${config.PORT}`);
});
