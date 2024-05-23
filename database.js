const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    await mongoose.connect('your-mongodb-url', {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    console.log('MongoDB connected');
  } catch (error) {
    console.error('Database connection failed', error);
    process.exit(1);
  }
}

module.exports = connectDB;