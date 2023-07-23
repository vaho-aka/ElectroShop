import express from 'express';
const router = express.Router();

import { protect, admin } from '../middleware/authMiddleware.js';
import {
  logIn,
  logOut,
  signUp,
  getUserProfile,
  updateUserProfile,
  getUsers,
  getUserById,
  deleteUser,
  updateUser,
} from '../controllers/userController.js';

router
  .route('/profil')
  .get(protect, getUserProfile)
  .put(protect, updateUserProfile);

router.post('/login', logIn);
router.post('/signup', signUp);
router.get('/logout', logOut);
router.get('/', protect, admin, getUsers);

router
  .route('/:id')
  .delete(protect, admin, deleteUser)
  .get(protect, admin, getUserById)
  .put(protect, admin, updateUser);

export default router;
