const userModel = require('../models/user.model');

class UserService {
    async createUser(userData) {
        try {
            const user = await userModel.create(userData);
            return user;
        } catch (error) {
            throw error;
        }
    }
}

module.exports = new UserService(); 