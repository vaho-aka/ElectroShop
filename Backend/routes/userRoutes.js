import express from 'express';
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
import { resizeUserImage } from './uploadRoutes.js';
import { userUpload } from '../controllers/uploadController.js';

const router = express.Router();

router
  .route('/profil')
  .get(protect, getUserProfile)
  .put(protect, userUpload.single('image'), resizeUserImage, updateUserProfile);

router.post('/login', logIn);
router.post('/signup', signUp);
router.get('/logout', logOut);
router.get('/', protect, admin, getUsers);

router
  .route('/:id', protect, admin)
  .delete(deleteUser)
  .get(getUserById)
  .put(updateUser);

export default router;
