import { Router } from 'express';
import orderRouter from './orders';
import productRouter from './products';
import NotFoundError from '../errors/not-found-error';

const router = Router();

router.use('/product', productRouter);
router.use('/order', orderRouter);
router.use((_req, _res, next) => {
  next(new NotFoundError('Unknown address'));
});

export default router;
