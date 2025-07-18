import { Joi, Segments } from 'celebrate';

const validateCreateProduct = {
  [Segments.BODY]: Joi.object().keys({
    title: Joi.string()
      .min(2)
      .max(30)
      .required()
      .label('Название')
      .messages({
        'string.base': '{#label} должно быть строкой',
        'string.min': '{#label} должно содержать минимум {#limit} символа',
        'string.max': '{#label} должно содержать максимум {#limit} символов',
        'any.required': '{#label} обязательно для заполнения',
      }),
    category: Joi.string()
      .required()
      .label('Категория')
      .messages({
        'string.base': '{#label} должна быть строкой',
        'any.required': '{#label} обязательна для заполнения',
      }),
    description: Joi.string()
      .required()
      .label('Описание')
      .messages({
        'string.base': '{#label} должно быть строкой',
        'any.required': '{#label} обязательно для заполнения',
      }),
    price: Joi.number()
      .allow(null)
      .label('Цена')
      .messages({
        'number.base': '{#label} должна быть числом или null',
      }),
    image: Joi.object({
      fileName: Joi.string()
        .required()
        .label('Имя файла')
        .messages({
          'string.base': '{#label} должно быть строкой',
          'any.required': '{#label} обязательно для заполнения',
        }),
      originalName: Joi.string()
        .required()
        .label('Оригинальное имя файла')
        .messages({
          'string.base': '{#label} должно быть строкой',
          'any.required': '{#label} обязательно для заполнения',
        }),
    })
      .required()
      .label('Изображение')
      .messages({
        'any.required': '{#label} обязательно для заполнения',
      }),
  }),
};

export default validateCreateProduct;
