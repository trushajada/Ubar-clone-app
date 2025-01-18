const captionModel = require('../models/caption.modal');

module.exports.createCaption = async ({
    firstname,
    color,
    plate,
    capacity,
    vehicleType,
    lastname,
    email,
    password,
    vehicle
}) => {
    if(!firstname || !color || !plate || !capacity || !vehicleType || !lastname || !email || !password || !vehicle) {
        throw new Error('All fields are required');
}
    const caption = await captionModel.create({
        fullname: {
            firstname,
            lastname
        },
        email,
        password,
        vehicle:{
            color,
            plate,
            capacity,
            vehicleType 
        }
    })

}

