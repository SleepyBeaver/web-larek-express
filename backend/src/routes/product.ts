import express from 'express';
import { celebrate } from 'celebrate';
import { getProducts, createProduct } from '../controllers/product';
import validateCreateProduct from '../middlewares/validators/product';

const router = express.Router();

router.get('/', getProducts);
router.post('/', celebrate(validateCreateProduct), createProduct);

export default router;
