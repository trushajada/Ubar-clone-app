const captionModel =require('../models/caption.modal');
const captionService =require('../services/caption.service');
const { validationResult } = require('express-validator');

const registerCaptain = async (req, res) => {
    try {
        // Check for validation errors
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        // TODO: Add your captain registration logic here
        // For now, just return the received data
        res.status(201).json({
            message: 'Captain registered successfully',
            data: req.body
        });
    } catch (error) {
        res.status(500).json({
            message: 'Error registering captain',
            error: error.message
        });
    }
};

module.exports = {
    registerCaptain
};
