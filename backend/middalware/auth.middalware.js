const userModel=require('../models/user.models');
const bcrypt=require('bcrypt');
const jwt=require('jsonwebtoken');

module.exports.authuser =async (req,res,next) => {
    const token=req.cookies.token||req.headers.authorization.split('')[1];
    if(!token){
        return res.status(401).json({message:"Unauthorized"})
    }
    try{
        const decoded=jwt.verify(token.process.env.JWT_SECRET);
        const user=await userModel.findById(decoded.id);
        req.user=user;
         return next();

    }catch(error){
        return res.status(401).json({message:"Unauthorized"})
    }
}