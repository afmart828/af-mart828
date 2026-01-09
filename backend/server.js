const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const userRoutes = require('./routes/userRoutes');
const productRoutes = require('./routes/productRoutes');
const { notFound, errorHandler } = require('./middleware/errorMiddleware');

dotenv.config();

const app = express();

// CORS configuration
app.use(cors({
  origin: process.env.CORS_ORIGIN || '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

// Parse JSON bodies
app.use(express.json());

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

// API health check
app.get('/api/health', (req, res) => res.json({ status: 'ok' }));

// Error handling
app.use(notFound);
app.use(errorHandler);

// Vercel Serverless Export
module.exports = app;
