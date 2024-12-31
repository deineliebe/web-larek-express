import { Request, Response, NextFunction } from 'express';
import { faker } from '@faker-js/faker';
import BadRequestError from '../errors/bad-request-error';
import Order from '../models/order';
import Product from '../models/product';

const addOrder = async (req: Request, res: Response, next: NextFunction) => {
  const {
    payment, email, phone, address, total, items,
  } = req.body;
  if (!payment) {
    return next(
      new BadRequestError(
        'Please, choose a payment type. Remember, it must be "card" or "online"',
      ),
    );
  }
  if (!total) {
    return next(
      new BadRequestError(
        'You must fill field "total" in your order. It must be equal to the total summ of product\'s prices',
      ),
    );
  }
  if (!items) {
    return next(
      new BadRequestError(
        'You must fill field "items" in your order. Use id\'s of products',
      ),
    );
  }
  const products = await Product.find({ _id: { $in: items } });
  let summ = 0;
  let price;
  products.forEach((product) => {
    price = product.price;
    if (price) {
      summ += price * items.filter((id: any) => id === product.id).length;
      return summ;
    }
    return next(
      new BadRequestError(
        'All products in your order must have a not-null price',
      ),
    );
  });
  if (new Set(items).size !== products.length) {
    return next(
      new BadRequestError(
        'Some of id\'s are not connected with current products',
      ),
    );
  }
  if (summ !== total) {
    return next(
      new BadRequestError(
        'Field "total" in your order must be equal to the total summ of product\'s prices',
      ),
    );
  }
  return Order.create({
    payment, email, phone, address, total, items,
  })
    .then(() => res.status(201).json({ id: faker.string.uuid(), total }))
    .catch((error) => next(error));
};

export default addOrder;
