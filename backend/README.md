# Diamond Art Mental Wellness Platform - Backend

This is the backend API for the Diamond Art Mental Wellness Platform, built with Node.js, Express, TypeScript, and MongoDB.

## Features

- User authentication (register, login, logout)
- Password reset functionality
- Protected routes with JWT
- Role-based authorization
- Error handling
- Environment configuration

## Prerequisites

- Node.js (v16 or higher)
- MongoDB (local or cloud instance)
- npm or yarn

## Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   # or
   yarn
   ```
3. Create a `.env` file in the root directory and add the following variables:
   ```env
   NODE_ENV=development
   PORT=5000
   MONGODB_URI=mongodb://localhost:27017/diamond-art
   JWT_SECRET=your_jwt_secret_here
   JWT_EXPIRE=30d
   JWT_COOKIE_EXPIRE=30
   FRONTEND_URL=http://localhost:3000
   ```
4. Start the development server:
   ```bash
   npm run dev
   # or
   yarn dev
   ```

## API Endpoints

### Authentication

- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current logged in user (protected)
- `POST /api/auth/forgotpassword` - Forgot password
- `PUT /api/auth/resetpassword/:resettoken` - Reset password

## Development

- `npm run dev` - Start development server with hot-reload
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm test` - Run tests

## Project Structure

```
backend/
├── src/
│   ├── config/          # Configuration files
│   ├── controllers/     # Route controllers
│   ├── middleware/      # Custom middleware
│   ├── models/          # Mongoose models
│   ├── routes/          # Route definitions
│   ├── types/           # TypeScript type definitions
│   ├── utils/           # Utility classes and functions
│   └── index.ts         # Application entry point
├── .env.example         # Example environment variables
├── package.json
├── tsconfig.json        # TypeScript configuration
└── README.md
```

## Environment Variables

- `NODE_ENV` - Application environment (development, production)
- `PORT` - Port to run the server on
- `MONGODB_URI` - MongoDB connection string
- `JWT_SECRET` - Secret for signing JWT tokens
- `JWT_EXPIRE` - JWT token expiration time
- `JWT_COOKIE_EXPIRE` - JWT cookie expiration in days
- `FRONTEND_URL` - URL of the frontend application (for CORS)

## License

This project is licensed under the MIT License.
