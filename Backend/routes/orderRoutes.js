import express from 'express';
import {
  addOrderItems,
  getOneOrder,
  getUserOrders,
} from '../controllers/orderController.js';

const router = express.Router();

router.route('/').post(addOrderItems).get(getUserOrders);
router.route('/:id').get(getOneOrder);

export default router;
