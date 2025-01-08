const mongoose = require('mongoose'); 

async function connectToDb() {
   mongoose.connect(process.env.DB_CONNECT, {
      useNewUrlParser: true,
      useUnifiedTopology: true, 
    },()=>{
        console.log('Connected to database!'); 

    });
}


module.exports = connectToDb; 