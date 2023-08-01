import express from 'express';
import path from 'path';

// Serving static files
const __dirname = path.resolve();

const router = express.Router();

import userRoutes from './userRoutes.js';
import productRoutes from './productRoutes.js';

router.use('/uploads', express.static(path.join(__dirname, '/uploads')));
router.use('/user', userRoutes);
router.use('/product', productRoutes);

export default router;
