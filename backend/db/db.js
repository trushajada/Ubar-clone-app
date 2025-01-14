const mongoose = require('mongoose');

const connectDB = async () => {
    mongoose.connect('mongodb://127.0.0.1:27017/ubar-clone-app') 
  .then(() => console.log('MongoDB Connected!'))
  .catch(err => console.error('MongoDB Connection Error:', err));
}

module.exports = connectDB;