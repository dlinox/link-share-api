const registerUserSchema = require('./registerUserSchema');
const loginUserSchema = require('./loginUserSchema');
const recoverPassSchema = require('./recoverPassSchema');
const updatePasswordWithCodeSchema = require('./updatePasswordWithCodeSchema');

module.exports = {
    registerUserSchema,
    loginUserSchema,
    recoverPassSchema,
    updatePasswordWithCodeSchema
};
