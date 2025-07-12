# Diamond Art Mental Wellness Platform

A mental wellness platform that combines the therapeutic benefits of diamond painting with digital tools for mental health tracking and community support.

## ✨ Features

- 🎨 AI-powered mood-based activity suggestions
- 📊 Personal dashboard for tracking engagement and well-being
- 💬 Community forum for peer support and sharing
- 🔒 Secure user authentication and profiles
- 💳 Subscription and in-app purchase system
- 🌈 Soothing, accessible design with glassmorphism effects

## 🚀 Tech Stack

### Frontend
- Next.js 14 with TypeScript
- Tailwind CSS + DaisyUI
- Framer Motion
- React Query for data fetching
- Zustand for state management

### Backend
- Node.js with Express
- MongoDB with Mongoose
- JWT Authentication
- RESTful API

## 🛠️ Project Structure

```
.
├── backend/           # Express.js backend
│   ├── src/          # Source code
│   ├── .env          # Backend environment variables
│   └── package.json  # Backend dependencies
├── frontend/         # Next.js frontend
│   ├── src/          # Source code
│   ├── public/       # Static files
│   └── package.json  # Frontend dependencies
├── .env              # Common environment variables
└── package.json      # Root project scripts
```

## 🛠️ Prerequisites

- Node.js >= 16.0.0
- npm >= 8.0.0
- MongoDB (local or cloud instance)

## 🛠️ Setup Instructions

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd mental-health-diamond-art-platform
   ```

2. **Install dependencies**
   ```bash
   # Install root dependencies
   npm install
   
   # Install frontend and backend dependencies
   npm run install:all
   ```

3. **Configure environment variables**
   - Copy `.env.example` to `.env`
   - Update the values in `.env` as needed

4. **Start the development servers**
   ```bash
   # Start both frontend and backend in development mode
   npm run dev
   ```
   - Frontend will be available at http://localhost:3000
   - Backend API will be available at http://localhost:5000

## 📂 Available Scripts

- `npm run dev` - Start both frontend and backend in development mode
- `npm run client` - Start only the frontend
- `npm run server` - Start only the backend
- `npm run build` - Build both frontend and backend for production
- `npm start` - Start the production server
- `npm test` - Run backend tests

## 📝 Environment Variables

### Backend
- `PORT` - Port for the backend server (default: 5000)
- `MONGODB_URI` - MongoDB connection string
- `JWT_SECRET` - Secret key for JWT authentication
- `NODE_ENV` - Environment (development/production)

### Frontend
- `NEXT_PUBLIC_API_URL` - Base URL for API requests

## 🚀 Deployment

For production deployment, make sure to:
1. Set `NODE_ENV=production`
2. Update all environment variables with production values
3. Build the application with `npm run build`
4. Start the production server with `npm start`

## 🎨 Design System

### Colors
- Primary: `#8B5CF6` (Soft purple)
- Secondary: `#EC4899` (Pink)
- Accent: `#3B82F6` (Blue)
- Background: `#F9FAFB` (Light gray)
- Text: `#1F2937` (Dark gray)

### Typography
- Primary Font: 'Inter', sans-serif
- Secondary Font: 'Nunito', sans-serif

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

Made with ❤️ for better mental health through creativity
