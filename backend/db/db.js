require('dotenv').config();
const mongoose = require('mongoose');

const connectToDb = async () => {
  const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://trushajada:2ySXU3VDWjlHXeHb@cluster0.v5bkx.mongodb.net/Uber_Clone', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => console.log('Connected to MongoDB'))
.catch(err => console.error('Connection error:', err));
}
module.exports = connectToDb;



