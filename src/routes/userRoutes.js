// Importing dependencies.
const express = require('express');
const router = express.Router();
// Importamos las funciones controladoras finales.
const {
   registerUserControllers,
   loginUserController
} = require('../controllers/users');

router.post('/users/register', registerUserControllers);

router.post('/users/login', loginUserController)

module.exports = router;
