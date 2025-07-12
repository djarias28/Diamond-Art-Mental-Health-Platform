import { VercelRequest, VercelResponse } from '@vercel/node';
import app, { connectDB } from '../src/index';

// List of allowed origins
const allowedOrigins = [
  'https://diamond-art-therapy.vercel.app',
  'http://localhost:3000',
  'https://diamond-art-therapy-server.vercel.app',
  'https://diamond-art-mental-health-platform.vercel.app'
];

// This is the Vercel serverless function handler
export default async function handler(req: VercelRequest, res: VercelResponse) {
  const origin = req.headers.origin || '';
  
  // Check if the request origin is in the allowed list
  if (allowedOrigins.includes(origin)) {
    res.setHeader('Access-Control-Allow-Origin', origin);
  } else if (process.env.NODE_ENV === 'development') {
    // In development, allow any origin
    res.setHeader('Access-Control-Allow-Origin', origin || '*');
  }
  
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version, Authorization'
  );
  res.setHeader('Access-Control-Expose-Headers', 'Set-Cookie');

  // Handle OPTIONS method for CORS preflight
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  try {
    // Connect to MongoDB if not already connected
    if (process.env.MONGODB_URI) {
      try {
        await connectDB();
      } catch (error) {
        console.error('Failed to connect to MongoDB:', error);
        return res.status(500).json({ message: 'Database connection failed' });
      }
    }

    // Pass the request to the Express app
    return app(req, res);
  } catch (error) {
    console.error('Server error:', error);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
}

// Add this to make it work with Vercel's serverless functions
module.exports = handler;
