// src/controllers/auth.ts
import { Request, Response, NextFunction } from 'express';
import User from '../models/User';
import ErrorResponse from '../utils/errorResponse';
import asyncHandler from '../middleware/async';
import crypto from 'crypto';
import jwt from 'jsonwebtoken';

// @desc    Register user
// @route   POST /api/auth/register
// @access  Public
export const register = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
  const { name, email, password, role, phone, dateOfBirth, gender } = req.body;

  try {
    // Create user with provided data
    const user = await User.create({
      name,
      email,
      password,
      role: role || 'user',
      phone: phone || '',
      dateOfBirth: dateOfBirth || null,
      gender: gender || 'unspecified',
      preferences: {
        theme: 'system',
        notificationEmails: true,
        notificationPush: true,
        timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
        dailyReminder: {
          enabled: false,
          time: '20:00'
        }
      }
    });

    // Generate and send token
    sendTokenResponse(user, 201, res);
  } catch (error: any) {
    // Handle duplicate key error
    if (error.code === 11000) {
      return next(new ErrorResponse('Email already exists', 400));
    }
    console.error('Registration error:', error);
    return next(new ErrorResponse('Server error during registration', 500));
  }
});

// @desc    Login user
// @route   POST /api/auth/login
// @access  Public
export const login = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
  const { email, password } = req.body;

  // Validate email & password
  if (!email || !password) {
    return next(new ErrorResponse('Please provide an email and password', 400));
  }

  // Check for user
  const user = await User.findOne({ email }).select('+password');

  if (!user) {
    return next(new ErrorResponse('Invalid credentials', 401));
  }

  // Check if password matches
  const isMatch = await user.matchPassword(password);

  if (!isMatch) {
    return next(new ErrorResponse('Invalid credentials', 401));
  }

  // Update last active
  user.lastActive = new Date();
  await user.save();

  sendTokenResponse(user, 200, res);
});

// @desc    Logout / clear cookie
// @route   GET /api/auth/logout
// @access  Private
export const logout = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
  res.cookie('token', 'none', {
    expires: new Date(Date.now() + 10 * 1000), // 10 seconds
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production'
  });

  res.status(200).json({
    success: true,
    data: {}
  });
});

// @desc    Forgot password
// @route   POST /api/auth/forgotpassword
// @access  Public
export const forgotPassword = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
  const user = await User.findOne({ email: req.body.email });

  if (!user) {
    return next(new ErrorResponse('There is no user with that email', 404));
  }

  // Get reset token
  const resetToken = user.getResetPasswordToken();

  await user.save({ validateBeforeSave: false });

  // Create reset url
  const resetUrl = `${req.protocol}://${req.get('host')}/api/auth/resetpassword/${resetToken}`;

  // TODO: Send email with reset URL
  console.log(`Password reset URL: ${resetUrl}`);

  res.status(200).json({
    success: true,
    data: 'Email sent'
  });
});

// @desc    Reset password
// @route   PUT /api/auth/resetpassword/:resettoken
// @access  Public
export const resetPassword = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
  // Get hashed token
  const resetPasswordToken = crypto
    .createHash('sha256')
    .update(req.params.resettoken)
    .digest('hex');

  const user = await User.findOne({
    resetPasswordToken,
    resetPasswordExpire: { $gt: Date.now() }
  });

  if (!user) {
    return next(new ErrorResponse('Invalid token', 400));
  }

  // Set new password
  user.password = req.body.password;
  user.resetPasswordToken = undefined;
  user.resetPasswordExpire = undefined;
  await user.save();

  sendTokenResponse(user, 200, res);
});

// Helper function to send token response
const sendTokenResponse = (user: any, statusCode: number, res: Response) => {
  // Create token
  const token = user.getSignedJwtToken();

  const options = {
    expires: new Date(Date.now() + (process.env.JWT_COOKIE_EXPIRE ? parseInt(process.env.JWT_COOKIE_EXPIRE) : 30) * 24 * 60 * 60 * 1000),
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