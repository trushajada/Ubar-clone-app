const mongoose = require('mongoose'); 

async function connectToDb() {
   mongoose.connect(process.env.DB_CONNECT).then(()=>{
        console.log("connect DB");
         }).catch(err=>console.log(err)
    )
}


module.exports = connectToDb; 