import mongoose, { Document, Schema, Model } from 'mongoose';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import crypto from 'crypto';

// Interface for User document
export interface IUser extends Document {
  // Authentication
  name: string;
  email: string;
  password: string;
  avatar?: string;
  role: 'user' | 'admin' | 'therapist';
  resetPasswordToken?: string;
  resetPasswordExpire?: Date;
  
  // Profile Information
  bio?: string;
  dateOfBirth?: Date;
  gender?: 'male' | 'female' | 'non-binary' | 'other' | 'prefer-not-to-say' | 'unspecified';
  phone?: string;
  address?: {
    street: string;
    city: string;
    state: string;
    country: string;
    zipCode: string;
  };
  
  // Activity Tracking
  lastActive: Date;
  completedActivities: Array<{
    activityId: mongoose.Types.ObjectId;
    completedAt: Date;
    moodBefore: number; // 1-5 scale
    moodAfter: number;  // 1-5 scale
    duration: number;   // in minutes
  }>;
  streak: number;       // Daily activity streak
  totalPoints: number;  // Points earned from activities
  
  // Preferences
  preferences: {
    theme: 'light' | 'dark' | 'system';
    notificationEmails: boolean;
    notificationPush: boolean;
    preferredActivities: string[]; // Activity categories
    timezone: string;
    dailyReminder: {
      enabled: boolean;
      time: string; // "HH:MM" format
    };
  };
  
  // Subscription & Payments
  subscription: {
    plan: 'free' | 'premium' | 'premium-plus';
    status: 'active' | 'cancelled' | 'expired';
    startDate: Date;
    endDate?: Date;
    paymentMethod?: string;
    lastPaymentDate?: Date;
  };
  
  // Social & Community
  friends: mongoose.Types.ObjectId[];
  blockedUsers: mongoose.Types.ObjectId[];
  achievements: string[];
  
  // Methods
  matchPassword(enteredPassword: string): Promise<boolean>;
  getSignedJwtToken(): string;
  getResetPasswordToken(): string;
  createdAt: Date;
  updatedAt: Date;
}

const UserSchema: Schema = new Schema({
  // Authentication
  name: {
    type: String,
    required: [true, 'Please add a name'],
    trim: true,
    maxlength: [50, 'Name cannot be more than 50 characters']
  },
  email: {
    type: String,
    required: [true, 'Please add an email'],
    unique: true,
    match: [
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
      'Please add a valid email'
    ]
  },
  password: {
    type: String,
    required: [true, 'Please add a password'],
    minlength: 8,
    select: false
  },
  avatar: {
    type: String,
    default: 'default-avatar.png'
  },
  role: {
    type: String,
    enum: ['user', 'admin', 'therapist'],
    default: 'user'
  },
  resetPasswordToken: String,
  resetPasswordExpire: Date,
  
  // Profile Information
  bio: {
    type: String,
    maxlength: [500, 'Bio cannot be more than 500 characters']
  },
  dateOfBirth: Date,
  gender: {
    type: String,
    enum: ['male', 'female', 'non-binary', 'other', 'prefer-not-to-say', 'unspecified'],
    default: 'unspecified'
  },
  phone: String,
  address: {
    street: String,
    city: String,
    state: String,
    country: String,
    zipCode: String
  },
  
  // Activity Tracking
  lastActive: {
    type: Date,
    default: Date.now
  },
  completedActivities: [{
    activityId: {
      type: Schema.Types.ObjectId,
      ref: 'Activity'
    },
    completedAt: {
      type: Date,
      default: Date.now
    },
    moodBefore: {
      type: Number,
      min: 1,
      max: 5
    },
    moodAfter: {
      type: Number,
      min: 1,
      max: 5
    },
    duration: Number, // in minutes
    notes: String
  }],
  streak: {
    type: Number,
    default: 0
  },
  totalPoints: {
    type: Number,
    default: 0
  },
  
  // Preferences
  preferences: {
    theme: {
      type: String,
      enum: ['light', 'dark', 'system'],
      default: 'system'
    },
    notificationEmails: {
      type: Boolean,
      default: true
    },
    notificationPush: {
      type: Boolean,
      default: true
    },
    preferredActivities: [String],
    timezone: {
      type: String,
      default: 'UTC'
    },
    dailyReminder: {
      enabled: {
        type: Boolean,
        default: false
      },
      time: {
        type: String,
        match: /^([01]\d|2[0-3]):([0-5]\d)$/, // HH:MM format
        default: '20:00'
      }
    }
  },
  
  // Subscription & Payments
  subscription: {
    plan: {
      type: String,
      enum: ['free', 'premium', 'premium-plus'],
      default: 'free'
    },
    status: {
      type: String,
      enum: ['active', 'cancelled', 'expired'],
      default: 'active'
    },
    startDate: {
      type: Date,
      default: Date.now
    },
    endDate: Date,
    paymentMethod: String,
    lastPaymentDate: Date
  },
  
  // Social & Community
  friends: [{
    type: Schema.Types.ObjectId,
    ref: 'User'
  }],
  blockedUsers: [{
    type: Schema.Types.ObjectId,
    ref: 'User'
  }],
  achievements: [String],
  
  // Timestamps
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

// Hash password before saving
UserSchema.pre<IUser>('save', async function(next) {
  // Only run this function if password was actually modified
  if (!this.isModified('password')) {
    return next();
  }

  try {
    // Generate salt
    const salt = await bcrypt.genSalt(10);
    // Hash the password with the salt
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error) {
    return next(error as Error);
  }
});

// Update lastActive timestamp on login
UserSchema.methods.updateLastActive = async function() {
  this.lastActive = Date.now();
  await this.save();
};

// Generate JWT token
UserSchema.methods.getSignedJwtToken = function(): string {
  const secret = process.env.JWT_SECRET || 'default_jwt_secret';
  return jwt.sign(
    { 
      id: this._id,
      role: this.role,
      name: this.name,
      email: this.email
    },
    secret,
    { expiresIn: process.env.JWT_EXPIRE || '30d' } as jwt.SignOptions
  );
};

// Match user entered password to hashed password
UserSchema.methods.matchPassword = async function(enteredPassword: string): Promise<boolean> {
  return await bcrypt.compare(enteredPassword, this.password);
};

// Generate and hash password token
UserSchema.methods.getResetPasswordToken = function(): string {
  // Generate token
  const resetToken = crypto.randomBytes(20).toString('hex');

  // Hash token and set to resetPasswordToken field
  this.resetPasswordToken = crypto
    .createHash('sha256')
    .update(resetToken)
    .digest('hex');

  // Set expire (10 minutes)
  this.resetPasswordExpire = new Date(Date.now() + 10 * 60 * 1000);

  return resetToken;
};

// Create and export the model
const User = mongoose.model<IUser>('User', UserSchema);
export default User;