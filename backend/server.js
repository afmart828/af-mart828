const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const userRoutes = require('./routes/userRoutes');
const productRoutes = require('./routes/productRoutes');
const { notFound, errorHandler } = require('./middleware/errorMiddleware');

dotenv.config();

// Connect to MongoDB (with graceful error handling for serverless)
let dbConnected = false;
const initDB = async () => {
  if (!dbConnected) {
    try {
      await connectDB();
      dbConnected = true;
    } catch (error) {
      console.warn('MongoDB connection failed, API may not work properly');
    }
  }
};

const app = express();

// CORS configuration
app.use(cors({
  origin: process.env.CORS_ORIGIN || '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

// Parse JSON bodies
app.use(express.json());

// Initialize database connection
initDB();

// Root route
app.get('/', (req, res) => {
  res.status(200).json({
    status: 'ok',
    message: 'Shop-with-Joy Backend is running'
  });
});

// Health check endpoint
app.get('/health', (req, res) => {
  const healthcheck = {
    status: 'UP',
    uptime: process.uptime(),
    message: 'OK',
    timestamp: Date.now(),
    memoryUsage: process.memoryUsage(),
    environment: process.env.NODE_ENV || 'development'
  };
  res.status(200).send(healthcheck);
});

// API routes
app.use('/api/users', userRoutes);
app.use('/api/products', productRoutes);

// Initialize DB and handle requests
app.all('/api/*', async (req, res, next) => {
  await initDB();
  next();
});

// API health check
app.get('/api/health', async (req, res) => {
  await initDB();
  res.json({ status: 'ok', dbConnected });
});

// Error handling
app.use(notFound);
app.use(errorHandler);

// Vercel Serverless Export
module.exports = app;
