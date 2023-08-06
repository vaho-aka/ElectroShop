import express from 'express';
import path from 'path';

import userRoutes from './userRoutes.js';
import productRoutes from './productRoutes.js';
import orderRoutes from './orderRoutes.js';
import { protect } from '../middleware/authMiddleware.js';

// Serving static files
const __dirname = path.resolve();

const router = express.Router();

router.use('/uploads', express.static(path.join(__dirname, '/uploads')));
router.use('/order', protect, orderRoutes);
router.use('/user', userRoutes);
router.use('/product', productRoutes);

export default router;
