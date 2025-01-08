const express =require('express');
const router = express.Router();
const {body} =require("express-validator");
const userController =require('../controllers/user.controllers')

    router.post('/register',[
        body('email').isEmail().withMessage('Invalid Email'),
        body('fullname.firstname').isLength({min:3}).withMessage('First name must be at least 3 character long'),
        body('password').isLength({min:6}).withMessage("password ust be 6 Character a Long")
    ],
    userController.registerUser
)


module.exports=router;