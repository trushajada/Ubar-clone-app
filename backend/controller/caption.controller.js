const captionModel =require('../models/caption.modal');
const captionService =require('../services/caption.service');
const { validationResult } = require('express-validator');
const BlacklistTokenModel = require('../models/blacklistToken');
module.exports.registerCaptain = async (req, res) => {
  try {
    const { email, password, ...otherDetails } = req.body;

    // Validate required fields
    if (!email || !password) {
      return res.status(400).json({ error: "Email and password are required" });
    }

    // Check if captain already exists
    const existingCaptain = await captionModel.findOne({ email });
    if (existingCaptain) {
      return res.status(400).json({ error: "Email already registered" });
    }

    const captain = new captionModel({
      email,
      password,
      ...otherDetails
    });

    // Save captain
    const savedCaptain = await captain.save();
    
    // Generate token
    const token = await savedCaptain.generateAuthToken();

    res.status(201).json({
      message: "Captain registered successfully",
      captain: savedCaptain,
      token
    });

  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({ error: error.message });
  }
};

module.exports.loginCaptain = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validate input
    if (!email || !password) {
      return res.status(400).json({ error: "Email and password are required" });
    }

    // Find captain by email
    const captain = await captionModel.findOne({ email });
    if (!captain) {
      return res.status(401).json({ error: "Invalid email or password" });
    }

    // Compare password
    const isMatch = await captain.comparePassword(password);
    if (!isMatch) {
      return res.status(401).json({ error: "Invalid email or password" });
    }

    // Generate token
    const token = await captain.generateAuthToken();
    res.json({ captain, token });

  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ error: error.message });
  }
};

module.exports.getCaptionProfile = async (req, res, next) => {
    res.status(200).json({caption: req.caption});
}

module.exports.logoutCaptain = async (req, res, next) => {
    const token = req.cookies.token || req.headers.authorization?.split('bearer')[1]?.trim();

    await BlacklistTokenModel.create({token});    
    res.clearCookie('token');
    res.status(200).json({message: 'Logout successful'});
}

