const express = require('express');
const router = express.Router();
const { body } = require('express-validator');
const userController = require('../controller/user.controller');
const authmiddalware = require('../middalware/auth.middalware');
// Register user route
router.post('/register', [
    body('email').isEmail().withMessage('Please enter a valid email'),
    body('fullname.firstname').isLength({ min: 3 }).withMessage('First name must be at least 3 characters long'),
    body('fullname.lastname').isLength({ min: 3 }).withMessage('Last name must be at least 3 characters long'),
    body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long')
], 
userController.registerUser
);

router.post('/login',[
        body('email').isEmail().withMessage('plase enter vaild email'),
        body('password').isLength({min:6}).withMessage('password must be at least 6 characters'),

],userController.loginUser
);
router.get('/profile',authmiddalware.authuser,userController.getUserProfile) 



module.exports = router;