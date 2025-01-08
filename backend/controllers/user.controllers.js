const { validationResult } = require('express-validator')
const userModel =require('../models/user.model')
const userServices =require('../services/user.services ')


model.exports.registerUser =async (req , res ,next)=>{

    const error =validationResult(req);
    if(!error.isEmpty()){
        return res.status(400).json({error:error.array()})
    }
}