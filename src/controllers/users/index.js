//Importing user controllers
const registerUserControllers = require('./registerUserController');
const loginUserController = require('./loginUserController');
const getOwnUserController = require('./getOwnUserController');
const editUserPassController = require('./editUserPassController');
const sendRecoverPassController = require('./sendRecoverPassController');

//Exporting users controllers
module.exports = {
    registerUserControllers,
    loginUserController,
    getOwnUserController,
    editUserPassController,
    sendRecoverPassController,
};
