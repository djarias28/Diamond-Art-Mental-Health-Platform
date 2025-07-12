// src/routes/auth.ts
import { Router } from 'express';
import { 
  register, 
  login, 
  forgotPassword, 
  resetPassword,
  logout 
} from '../controllers/auth';
import { 
  getMe, 
  updateDetails, 
  updatePassword, 
  updatePreferences,
  completeActivity,
  getActivityHistory,
  getUserStats
} from '../controllers/user';
import { protect } from '../middleware/auth';

const router = Router();

// Public routes
router.post('/register', register);
router.post('/login', login);
router.post('/forgotpassword', forgotPassword);
router.put('/resetpassword/:resettoken', resetPassword);
router.get('/logout', protect, logout);

// Protected routes
router.get('/me', protect, getMe);
router.put('/updatedetails', protect, updateDetails);
router.put('/updatepassword', protect, updatePassword);
router.put('/preferences', protect, updatePreferences);
router.get('/stats', protect, getUserStats);

// Activity routes
router.post('/activities/complete', protect, completeActivity);
router.get('/activities/history', protect, getActivityHistory);

export default router;