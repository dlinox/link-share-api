const express = require('express');
const router = express.Router();

const { authUser, userExists } = require('../middlewares');

const {
    registerUserControllers,
    loginUserController,
    getOwnUserController,
    editUserPassController,
} = require('../controllers/users');

// EndPoints
router.post('/users/register', registerUserControllers);
router.post('/users/login', loginUserController);
// Info user token
router.get('/users', authUser, userExists, getOwnUserController);
// change pwd
router.put('/users/password', authUser, userExists, editUserPassController);

module.exports = router;
