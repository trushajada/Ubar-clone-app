const userModel =require('../models/user.models');
const userService =require('../services/user.services');
const {validationResult} = require('express-validator');
const bcrypt = require('bcrypt');


module.exports.registerUser = async (req, res, next) => {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { fullname, email, password } = req.body;

    const isUserAlready = await userModel.findOne({ email });

    if (isUserAlready) {
        return res.status(400).json({ message: 'User already exist' });
    }

    const hashedPassword = await userModel.hashPassword(password);

    const user = await userService.createUser({
        firstname :fullname.firstname,
        lastname:fullname.lastname,
        email,
        password: hashedPassword
    });

    const token = user.generateAuthToken();

    res.status(201).json({user,token });
}

module.exports.loginUser =async (req,res,next)=>{
    const errors =validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors:errors.array()});
    }
    const {email,password}=req.body;
    const user =await userModel.findOne({email}).select('+password');

    if(!user){
        return res.status(400).json({message:'user not found'})
    }
    const isMatch =await user.comparePassword(password);
    if(!isMatch){
        return res.status(400).json({message:"invalid password"})
    }
    const token =user.generateAuthToken();
    res.status(200).json({user,token})
}