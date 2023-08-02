// Importing dependencies.
const express = require('express');
const router = express.Router();
// Importamos las funciones controladoras finales.
const {
   registerUserControllers,
} = require('../controllers/users');

router.post('/users', registerUserControllers);
module.exports = router;
