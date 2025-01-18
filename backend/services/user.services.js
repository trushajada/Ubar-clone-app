const userModel = require('../models/user.models');

module.exports.createUser = async ({firstname, lastname, email, password}) => {
    if(!firstname || !lastname || !email || !password) {
        throw new Error('Invalid input');
    }

    const user = await userModel.create({
        fullname: {
            firstname,
            lastname
        },
        email,
        password
    });
    
    // Remove sensitive data
    user.password = undefined;
    return user;
}