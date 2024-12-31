import { Router } from 'express';
import { celebrate, Segments } from 'celebrate';
import { productValidation } from '../middlewares/validations';
import { getProducts, addProduct } from '../controllers/products';

const productsRouter = Router();

const validator = celebrate({ [Segments.BODY]: productValidation });

productsRouter.get('/', getProducts);
productsRouter.post('/', validator, addProduct);

export default productsRouter;
