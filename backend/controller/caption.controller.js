const captainModel =require('../models/caption.modal');



exports.createCaption = async (req, res) => {
    try {
        // Your caption creation logic here
        const caption = await Caption.create(req.body);
        res.status(201).json({
            success: true,
            caption
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
}; 