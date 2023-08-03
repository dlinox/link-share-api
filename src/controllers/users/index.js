const registerUserControllers = require('./registerUserController');
const loginUserController = require('./loginUserController');
const getOwnUserController = require('./getOwnUserController');
const editUserPassController = require('./editUserPassController');

module.exports = {
    registerUserControllers,
    loginUserController,
    getOwnUserController,
    editUserPassController,
};
