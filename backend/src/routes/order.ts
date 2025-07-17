import express from 'express';
import { celebrate } from 'celebrate';
import { createOrder } from '../controllers/order';
import { validateCreateOrder } from '../middlewares/validators/order';

const router = express.Router();

router.post('/', celebrate(validateCreateOrder), createOrder);

export default router;
