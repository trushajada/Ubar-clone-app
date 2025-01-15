const mongoose = require('mongoose');

const connectToDb = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI); 
    console.log('MongoDB Connected to DB.JS');
  } catch (error) {
    console.error('Error connecting to DB in DB.JS:', error);
  }
};

module.exports = connectToDb;