const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const userRoutes = require('./routes/userRoutes');
const authRoutes = require('./routes/authRoutes');
const productRoutes = require('./routes/productRoutes');
const orderRoutes = require('./routes/orderRoutes');
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
  origin: process.env.CORS_ORIGIN || ['https://afmart.vercel.app', 'https://adminafmart.vercel.app'],
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

// Parse JSON bodies
app.use(express.json());

// Initialize database connection and seed admin user
initDB().then(async () => {
  try {
    const User = require('./models/User');
    const bcrypt = require('bcryptjs');

    // Check if admin user exists
    const existingAdmin = await User.findOne({ email: 'admin@example.com' });
    if (!existingAdmin) {
      // Hash the password
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash('admin123', salt);

      // Create admin user
      const adminUser = new User({
        name: 'Admin User',
        email: 'admin@example.com',
        password: hashedPassword,
        isAdmin: true,
      });

      await adminUser.save();
      console.log('Admin user created: admin@example.com / admin123');
    }
  } catch (error) {
    console.warn('Error creating admin user:', error.message);
  }
});

// Initialize DB and handle requests for all /api/* routes
app.all('/api/*', async (req, res, next) => {
  await initDB();
  next();
});

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

// API health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', dbConnected });
});

// API routes
app.use('/api/users', userRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);
app.use('/api/orders', orderRoutes);

// Error handling
app.use(notFound);
app.use(errorHandler);

// For local development
if (require.main === module) {
  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}

// Vercel Serverless Export
module.exports = app;
