//Importing dependencies
const express = require('express');
const router = express.Router();


//Importing final controller functions
const {
    registerUserControllers,
    loginUserController,
    getOwnUserController,
    editUserPassController,
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

module.exports = router;
