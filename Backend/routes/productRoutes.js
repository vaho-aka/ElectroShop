import express from 'express';
import {
  createRating,
  getProducts,
  getProductsById,
} from '../controllers/productController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/', getProducts);
router.post('/:id/review', protect, createRating);
router.get('/:id', getProductsById);

export default router;
