//Importing user controllers
const registerUserControllers = require('./registerUserController');
const loginUserController = require('./loginUserController');
const getOwnUserController = require('./getOwnUserController');
const editUserPassController = require('./editUserPassController');

//Exporting users controllers
module.exports = {
    registerUserControllers,
    loginUserController,
    getOwnUserController,
    editUserPassController,
};
