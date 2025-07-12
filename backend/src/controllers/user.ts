// In src/controllers/user.ts
import { Request, Response, NextFunction } from 'express';
import User, { IUser } from '../models/User';
import ErrorResponse from '../utils/errorResponse';
import asyncHandler from '../middleware/async';
import { Types } from 'mongoose';

// @desc    Get current logged in user
// @route   GET /api/auth/me
// @access  Private
export const getMe = asyncHandler(async (req: any, res: Response, next: NextFunction) => {
  const user = await User.findById(req.user.id)
    .select('-password -resetPasswordToken -resetPasswordExpire');

  if (!user) {
    return next(new ErrorResponse('User not found', 404));
  }

  res.status(200).json({
    success: true,
    data: user
  });
});

// @desc    Update user details
// @route   PUT /api/auth/updatedetails
// @access  Private
export const updateDetails = asyncHandler(async (req: any, res: Response, next: NextFunction) => {
  const fieldsToUpdate: Partial<IUser> = {
    name: req.body.name,
    email: req.body.email,
    bio: req.body.bio,
    phone: req.body.phone,
    gender: req.body.gender,
    dateOfBirth: req.body.dateOfBirth,
    address: req.body.address
  };

  const user = await User.findByIdAndUpdate(
    req.user.id, 
    { $set: fieldsToUpdate },
    {
      new: true,
      runValidators: true
    }
  ).select('-password -resetPasswordToken -resetPasswordExpire');

  if (!user) {
    return next(new ErrorResponse('User not found', 404));
  }

  res.status(200).json({
    success: true,
    data: user
  });
});

// @desc    Update user preferences
// @route   PUT /api/auth/preferences
// @access  Private
export const updatePreferences = asyncHandler(async (req: any, res: Response, next: NextFunction) => {
  const user = await User.findByIdAndUpdate(
    req.user.id,
    { $set: { preferences: req.body } },
    {
      new: true,
      runValidators: true
    }
  ).select('-password -resetPasswordToken -resetPasswordExpire');

  if (!user) {
    return next(new ErrorResponse('User not found', 404));
  }

  res.status(200).json({
    success: true,
    data: user.preferences
  });
});

// @desc    Update password
// @route   PUT /api/auth/updatepassword
// @access  Private
export const updatePassword = asyncHandler(async (req: any, res: Response, next: NextFunction) => {
  const user = await User.findById(req.user.id).select('+password');

  if (!user) {
    return next(new ErrorResponse('User not found', 404));
  }

  // Check current password
  if (!(await user.matchPassword(req.body.currentPassword))) {
    return next(new ErrorResponse('Password is incorrect', 401));
  }

  user.password = req.body.newPassword;
  await user.save();

  sendTokenResponse(user, 200, res);
});

// @desc    Record activity completion
// @route   POST /api/activities/complete
// @access  Private
export const completeActivity = asyncHandler(async (req: any, res: Response, next: NextFunction) => {
  const { activityId, moodBefore, moodAfter, duration, notes } = req.body;

  const activityData = {
    activityId: new Types.ObjectId(activityId),
    completedAt: new Date(),
    moodBefore: Number(moodBefore),
    moodAfter: Number(moodAfter),
    duration: Number(duration),
    ...(notes && { notes })
  };

  const user = await User.findByIdAndUpdate(
    req.user.id,
    {
      $push: { completedActivities: activityData },
      $inc: { 
        totalPoints: 10,
        streak: 1
      },
      lastActive: new Date()
    },
    { new: true }
  ).select('-password -resetPasswordToken -resetPasswordExpire');

  if (!user) {
    return next(new ErrorResponse('User not found', 404));
  }

  res.status(200).json({
    success: true,
    data: user.completedActivities[user.completedActivities.length - 1]
  });
});

// @desc    Get user activity history
// @route   GET /api/activities/history
// @access  Private
export const getActivityHistory = asyncHandler(async (req: any, res: Response, next: NextFunction) => {
  const user = await User.findById(req.user.id)
    .select('completedActivities')
    .populate('completedActivities.activityId', 'name description category')
    .lean();

  if (!user) {
    return next(new ErrorResponse('User not found', 404));
  }

  res.status(200).json({
    success: true,
    count: user.completedActivities.length,
    data: user.completedActivities
  });
});

// @desc    Get user stats
// @route   GET /api/auth/stats
// @access  Private
export const getUserStats = asyncHandler(async (req: any, res: Response, next: NextFunction) => {
  const user = await User.findById(req.user.id)
    .select('streak totalPoints completedActivities')
    .lean();

  if (!user) {
    return next(new ErrorResponse('User not found', 404));
  }

  // Calculate mood improvements
  const moodImprovements = (user.completedActivities || [])
    .filter((a: any) => a.moodBefore && a.moodAfter)
    .map((a: any) => a.moodAfter - a.moodBefore);

  const avgMoodImprovement = moodImprovements.length > 0 
    ? Number((moodImprovements.reduce((a: number, b: number) => a + b, 0) / moodImprovements.length).toFixed(1))
    : 0;

  res.status(200).json({
    success: true,
    data: {
      streak: user.streak || 0,
      totalPoints: user.totalPoints || 0,
      activitiesCompleted: (user.completedActivities || []).length,
      avgMoodImprovement
    }
  });
});

// Helper function to send token response
const sendTokenResponse = (user: IUser, statusCode: number, res: Response) => {
  // Create token
  const token = user.getSignedJwtToken();

  const options = {
    expires: new Date(Date.now() + (process.env.JWT_COOKIE_EXPIRE ? Number(process.env.JWT_COOKIE_EXPIRE) : 30) * 24 * 60 * 60 * 1000),
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production'
  };

  res
    .status(statusCode)
    .cookie('token', token, options)
    .json({
      success: true,
      token,
      data: {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        preferences: user.preferences
      }
    });
};