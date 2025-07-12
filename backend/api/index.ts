import { VercelRequest, VercelResponse } from '@vercel/node';
import app, { connectDB } from '../src/index';
import mongoose from 'mongoose';

// This is the Vercel serverless function handler
export default async function handler(req: VercelRequest, res: VercelResponse) {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version, Authorization'
  );

  // Handle OPTIONS method for CORS preflight
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  try {
    // Connect to MongoDB if not already connected
    if (mongoose.connection.readyState === 0) { // 0 = disconnected
      try {
        await connectDB();
      } catch (error) {
        console.error('Failed to connect to MongoDB:', error);
        return res.status(500).json({ message: 'Database connection failed' });
      }
    }
    
    // Handle the request with Express app
    return app(req, res);
  } catch (error) {
    console.error('Server error:', error);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
}
