const captionModel =require('../models/caption.modal');
const captionService =require('../services/caption.service');
const { validationResult } = require('express-validator');

module.exports.registerCaptain = async (req, res ,next) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors: errors.array()});
    }   

    const {fullname, email, password, vehicle} = req.body;

    const isCaptionAlready = await captionModel.findOne({email});

    const hashedPassword = await captionModel.hashPassword(password);   

    const caption = await captionService.createCaption({
        firstname: fullname.firstname,
        lastname: fullname.lastname,
        email,
        password: hashedPassword,
        vehicle,
        color: vehicle.color,
        plate: vehicle.plate,
        capacity: vehicle.capacity,
        vehicleType: vehicle.vehicleType

    }); 
    const token = caption.generateAuthToken();
     res.status(201).json({token,caption});

}

