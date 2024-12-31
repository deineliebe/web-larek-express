import { Router } from 'express';
import { celebrate, Segments } from 'celebrate';
import addOrder from '../controllers/order';
import { orderValidation } from '../middlewares/validations';

const ordersRouter = Router();

const validator = celebrate({ [Segments.BODY]: orderValidation });

ordersRouter.post('/', validator, addOrder);

export default ordersRouter;
