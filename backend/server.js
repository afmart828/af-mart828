const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const userRoutes = require('./routes/userRoutes');
const productRoutes = require('./routes/productRoutes');
const { notFound, errorHandler } = require('./middleware/errorMiddleware');

dotenv.config();
connectDB();

const app = express();
app.use(cors({
  origin: process.env.CORS_ORIGIN || '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(express.json());

/**
 * @route   GET /
 * @desc    Basic Status Check
 */
app.get('/', (req, res) => {
    res.status(200).json({
        status: 'ok',
        message: 'Shop-with-Joy Backend is running'
    });
});

/**
 * @route   GET /health
 * @desc    Professional Health Check Endpoint
 * Includes uptime, system memory, and timestamp
 */
app.get('/health', (req, res) => {
    const healthcheck = {
        status: 'UP',
        uptime: process.uptime(),
        message: 'OK',
        timestamp: Date.now(),
        // Professional metrics
        memoryUsage: process.memoryUsage(),
        environment: process.env.NODE_ENV || 'development'
    };

    try {
        res.status(200).send(healthcheck);
    } catch (error) {
        healthcheck.message = error;
        res.status(503).send();
    }
});

// Routes
app.use('/api/users', userRoutes);
app.use('/api/products', productRoutes);

// Health check
app.get('/api/health', (req, res) => res.json({ status: 'ok' }));

// Error handling
app.use(notFound);
app.use(errorHandler);

// Start Server (for local development)
const PORT = process.env.PORT || 5000;

// Vercel Serverless Export
module.exports = app;

// Local development server
if (process.env.NODE_ENV !== 'production') {
  app.listen(PORT, () => {
    console.log(`
🚀 Server is flying on port ${PORT}
✅ Status: http://localhost:${PORT}/
🏥 Health: http://localhost:${PORT}/health
    `);
  });
}
