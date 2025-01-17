const BlacklistToken = require('../models/blacklistToken');
const userModel = require('../models/user.models');
const jwt = require('jsonwebtoken');

module.exports.authUser = async (req, res, next) => {
    try {
        // Get token from header and clean up any extra spaces
        const authHeader = req.headers.authorization;
        const token = authHeader?.split('bearer')[1]?.trim() || req.cookies.token;

        if (!token) {
            console.log('No token provided');
            return res.status(401).json({ message: 'No authentication token, access denied' });
        }
        const isBlacklisted =await BlacklistToken.findOne({token:token});

        if(isBlacklisted){
            return res.status(401).json({message:'unauthorization'})
        }

        try {
            // Verify token
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            
            // Find user
            const user = await userModel.findById(decoded._id);
            if (!user) {
                console.log('User not found');
                return res.status(401).json({ message: 'User not found' });
            }

            // Attach user to request
            req.user = user;
            next();

        } catch (jwtError) {
            console.log('JWT verification failed:', jwtError.message);
            return res.status(401).json({ message: 'Invalid or expired token' });
        }

    } catch (err) {
        console.log('Auth error:', err.message);
        return res.status(401).json({ message: 'Authentication failed' });
    }
}


