import { Request, Response, NextFunction } from 'express';
import BadRequestError from '../errors/bad-request-error';
import ConflictError from '../errors/conflict-error';
import Product from '../models/product';

export const getProducts = async (_req: Request, res: Response, next: NextFunction) => {
  Product.find({})
    .then((products) => res.status(200).json({
      items: products,
      total: products.length,
    }))
    .catch((error) => next(error));
};

export const addProduct = async (req: Request, res: Response, next: NextFunction) => {
  const {
    image, title, category, description, price,
  } = req.body;
  if (!image) {
    return next(
      new BadRequestError(
        'Please, fix an image data of the product you want to add. It must include "filename" and "originalName" fields',
      ),
    );
  }
  if (!title) {
    return next(
      new BadRequestError(
        'You must fill field "title" in the product you want to add',
      ),
    );
  }
  if (!category) {
    return next(
      new BadRequestError(
        'You must fill field "category" in the product you want to add',
      ),
    );
  }
  return Product.create({
    image, title, category, description, price,
  })
    .then((product) => res.status(201).json({ data: product }))
    .catch((error) => {
      if (error instanceof Error && error.message.includes('E11000')) {
        return next(
          new ConflictError(
            'Please, write another title for product. This one is already exists.',
          ),
        );
      }
      return next(error);
    });
};
