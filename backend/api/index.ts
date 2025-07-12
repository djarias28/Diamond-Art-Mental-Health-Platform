import app from '../src/index';
import { connectDB } from '../src/index';

// This is the Vercel serverless function handler
export default async function handler(req: any, res: any) {
  try {
    // Connect to MongoDB
    await connectDB();
    
    // Pass the request to the Express app
    return app(req, res);
  } catch (error) {
    console.error('Server error:', error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
}

// Add this to make it work with Vercel's serverless functions
module.exports = handler;
