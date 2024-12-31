import Joi from 'joi';

export const productValidation = Joi.object({
  title: Joi.string().min(2).max(30)
    .required()
    .messages({
      'any.required': 'Field "title" is required',
      'strings.min': 'Minimal length of the field "title" is 2',
      'strings.max': 'Maximal length of the field "title" is 30',
    }),
  image: Joi.object({
    fileName: Joi.string().required()
      .messages({
        'any.required': 'Field "fileName" in image is required',
      }),
    originalName: Joi.string().required()
      .messages({
        'any.required': 'Field "originalName" in image is required',
      }),
  }).required()
    .messages({
      'any.required': 'Field "image" is required',
    }),
  category: Joi.string().required()
    .messages({
      'any.required': 'Field "category" is required',
    }),
  description: Joi.string().optional(),
  price: Joi.number().allow(null).optional(),
});

export const orderValidation = Joi.object({
  items: Joi.array().items(Joi.string()).required()
    .messages({
      'any.required': 'Field "items" is required',
    }),
  total: Joi.number().positive().required()
    .messages({
      'any.required': 'Field "total" is required',
    }),
  payment: Joi.string().required()
    .messages({
      'any.required': 'Field "payment" is required',
    }),
  email: Joi.string().email().required()
    .messages({
      'any.required': 'Field "email" is required',
    }),
  phone: Joi.string().required()
    .messages({
      'any.required': 'Field "phone" is required',
    }),
  address: Joi.string().required()
    .messages({
      'any.required': 'Field "address" is required',
    }),
});
