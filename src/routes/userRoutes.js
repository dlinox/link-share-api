//Importing dependencies
const express = require('express');
const router = express.Router();


//Importing final controller functions
const {
    registerUserControllers,
    loginUserController,
    getOwnUserController,
    editUserPassController,
    sendRecoverPassController,
    updatePasswordWithCodeController,
} = require('../controllers/users');

//Importing intermediate controller functions 
const { authUser, userExists } = require('../middlewares');

// User register
router.post('/users/register', registerUserControllers);

//User login
router.post('/users/login', loginUserController);

// Info user token
router.get('/users', authUser, userExists, getOwnUserController);

// Change pwd
router.put('/users/password', authUser, userExists, editUserPassController);

router.post('/users/password/recover', sendRecoverPassController); // required temporary pass to change the pass

router.put('/users/password/recover', updatePasswordWithCodeController); // to add new pass

module.exports = router;
