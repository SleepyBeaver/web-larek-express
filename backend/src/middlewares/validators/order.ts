import { Joi, Segments } from 'celebrate';

export const validateCreateOrder = {
  [Segments.BODY]: Joi.object().keys({
    payment: Joi.string().valid('card', 'online').required().label('Способ оплаты').messages({
      'string.base': '{#label} должен быть строкой',
      'any.only': '{#label} должен быть "card" или "online"',
      'any.required': '{#label} обязателен для заполнения',
    }),
    email: Joi.string().email().required().label('Email').messages({
      'string.base': '{#label} должен быть строкой',
      'string.email': '{#label} должен быть валидным email-адресом',
      'any.required': '{#label} обязателен для заполнения',
    }),
    phone: Joi.string().required().label('Телефон').messages({
      'string.base': '{#label} должен быть строкой',
      'any.required': '{#label} обязателен для заполнения',
    }),
    address: Joi.string().required().label('Адрес').messages({
      'string.base': '{#label} должен быть строкой',
      'any.required': '{#label} обязателен для заполнения',
    }),
    total: Joi.number().required().label('Сумма заказа').messages({
      'number.base': '{#label} должна быть числом',
      'any.required': '{#label} обязательна для заполнения',
    }),
    items: Joi.array().items(
      Joi.string().length(24).label('ID товара')
    ).min(1).required().label('Список товаров').messages({
      'array.base': '{#label} должен быть массивом',
      'array.min': '{#label} не может быть пустым',
      'any.required': '{#label} обязателен для заполнения',
    }),
  }),
};
