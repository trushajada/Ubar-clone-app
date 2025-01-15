const mongoose = require('mongoose');

mongoose.connect('mongodb://127.0.0.1:27017/ubar-clone-app') 
  .then(() => console.log('MongoDB Connected!'))
  .catch(err => console.error('MongoDB Connection Error:', err));

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/ubar-clone-app', {
    });

    console.log(`MongoDB Connected:`);
  } catch (error) {
    console.error(`Error:`);
    process.exit(1);
  }
}

module.exports = connectDB