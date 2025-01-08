const mongoose =require('mongoose');

const userSchema =new mongoose.Schema({
    fullname:{
        firstname:{
            type:String,
            required:true,
            minlenghth:[3,'First Name mus be latest 3 character long'],
        },
        lastname:{
            type:String,
            minlenghth:[3,'Last Name mus be latest 3 character long'],
        }
    },
    email:{
            type:String,
            required:true,
            unique:true,
            minlenghth:[5,'Email mus be latest 5 character long'],
    }
})