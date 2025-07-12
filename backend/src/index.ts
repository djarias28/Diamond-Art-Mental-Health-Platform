import express, { Application, Request, Response, NextFunction } from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';

// Load environment variables
dotenv.config({ path: path.join(__dirname, '../.env') });

// Import routes 
import authRoutes from './routes/auth';

// Initialize express
const app: Application = express();

// Middleware
app.use(express.json());

// CORS configuration
const allowedOrigins = [
  'http://localhost:3000',
  'https://diamond-art-therapy.vercel.app',
  'https://diamond-art-mental-health-platform.vercel.app'
];

// Enable CORS for all routes
app.use((req, res, next) => {
  const origin = req.headers.origin;
  
  // Allow requests from any origin in development
  if (process.env.NODE_ENV === 'development' || (origin && allowedOrigins.includes(origin))) {
    res.header('Access-Control-Allow-Origin', origin || '*');
  }
  
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  res.header('Access-Control-Allow-Credentials', 'true');
  
  // Handle preflight requests
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }
  
  next();
});

// Routes
app.use('/api/auth', authRoutes);

// Root endpoint
app.get('/', (req: Request, res: Response) => {
  res.json({
    message: 'Welcome to Diamond Art Therapy API',
    status: 'running',
    version: '1.0.0',
    documentation: 'https://github.com/yourusername/diamond-art-therapy-backend#readme',
    endpoints: {
      health: '/api/health',
      auth: {
        login: '/api/auth/login',
        register: '/api/auth/register',
        me: '/api/auth/me',
        forgotPassword: '/api/auth/forgotpassword',
        resetPassword: '/api/auth/resetpassword/:token',
        updateDetails: '/api/auth/updatedetails',
        updatePassword: '/api/auth/updatepassword',
        preferences: '/api/auth/preferences',
        stats: '/api/auth/stats',
        activities: {
          complete: '/api/auth/activities/complete',
          history: '/api/auth/activities/history'
        }
      }
    }
  });
});

// Health check endpoint
app.get('/api/health', (req: Request, res: Response) => {
  res.status(200).json({ status: 'ok' });
});

// 404 handler
app.use((req: Request, res: Response) => {
  res.status(404).json({ message: 'Not Found' });
});

// Error handler
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Internal Server Error' });
});

// MongoDB connection function
export const connectDB = async () => {
  const MONGODB_URI = process.env.MONGODB_URI;
  
  if (!MONGODB_URI) {
    throw new Error('MongoDB connection string not found in environment variables');
  }

  try {
    await mongoose.connect(MONGODB_URI);
    console.log('MongoDB connected successfully');
    return mongoose.connection;
  } catch (error) {
    console.error('MongoDB connection error:', error);
    throw error;
  }
};

// For Vercel serverless functions
export default app;

// For local development
if (process.env.NODE_ENV !== 'production') {
  const PORT = process.env.PORT || 5000;
  app.listen(PORT, async () => {
    try {
      await connectDB();
      console.log(`Server is running on port ${PORT}`);
    } catch (error) {
      console.error('Failed to start server:', error);
      process.exit(1);
    }
  });
}
