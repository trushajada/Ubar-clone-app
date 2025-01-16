require('dotenv').config();
const mongoose = require('mongoose');

const connectToDb = async () => {
    try {
        console.log('Connecting to MongoDB...');
        
        await mongoose.connect(process.env.DB_CONNECT, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        
        console.log('✅ Connected to MongoDB Successfully!');
        
        mongoose.connection.on('error', (err) => {
            console.log('❌ MongoDB Error:', err);
        });

        mongoose.connection.on('disconnected', () => {
            console.log('❌ MongoDB Disconnected');
        });

    } catch (error) {
        console.log('❌ MongoDB Connection Error:', error.message);
        process.exit(1);
    }
};

module.exports = connectToDb;



