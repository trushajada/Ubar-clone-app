const BlacklistToken = require('../models/blacklistToken');
const userModel = require('../models/user.models');
const jwt = require('jsonwebtoken');
const BlacklistTokenModel = require('../models/blacklistToken');
const captionModel = require('../models/caption.modal');

module.exports.authUser = async (req, res, next) => {
    try {
        // Get token from header and clean up any extra spaces
        const authHeader = req.headers.authorization;
        const token = authHeader?.split('bearer')[1]?.trim() || req.cookies.token;

        if (!token) {
            console.log('No token provided');
            return res.status(401).json({ message: 'No authentication token, access denied' });
        }
        const isBlacklisted =await BlacklistTokenModel.findOne({token:token});

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

exports.authCaptain = async (req, res, next) => {
    try {
        // Get token from multiple sources
        let token = null;

        // Check Authorization header
        const authHeader = req.headers.authorization;
        if (authHeader && authHeader.toLowerCase().startsWith('bearer ')) {
            token = authHeader.split(' ')[1].trim();
        console.log(token);

        }
        // Check cookies
        
        else if (req.cookies && req.cookies.token) {
            token = req.cookies.token;
        }

        if (!token) {
            return res.status(401).json({ 
                success: false,
                message: 'No authentication token provided' 
            });
        }

        // Check if token is blacklisted
        const isBlacklisted = await BlacklistToken.findOne({ token });
        if (isBlacklisted) {
            return res.status(401).json({ 
                success: false,
                message: 'Token has been invalidated' 
            });
        }

        // Verify token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        
        // Get captain data
        const captain = await Captain.findById(decoded._id);
        if (!captain) {
            return res.status(401).json({ 
                success: false,
                message: 'Captain not found' 
            });
        }

        // Attach captain and token to request
        req.captain = captain;
        req.token = token;

        next();
    } catch (error) {
        console.error('Auth error:', error);
        return res.status(401).json({ 
            success: false,
            message: 'Invalid or expired token' 
        });
    }
};
