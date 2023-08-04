import express from 'express';
const router = express.Router();

import {
  createRating,
  getProducts,
  getProductsById,
} from '../controllers/productController.js';
import { protect } from '../middleware/authMiddleware.js';

router.get('/', getProducts);
router.post('/:id/review', protect, createRating);
router.get('/:id', getProductsById);

export default router;
