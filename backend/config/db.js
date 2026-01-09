const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    // Set up connection options for serverless environment
    const options = {
      maxPoolSize: 10,
      serverSelectionTimeoutMS: 5000,
      socketTimeoutMS: 45000,
    };

    const conn = await mongoose.connect(process.env.MONGO_URI, options);
    console.log(`MongoDB Connected: ${conn.connection.host}`);
    return conn;
  } catch (error) {
    console.error(`MongoDB Connection Error: ${error.message}`);
    // Don't exit in serverless environment - just log the error
    return null;
  }
};

module.exports = connectDB;
