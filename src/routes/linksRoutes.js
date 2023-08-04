// importing dependencies
const express = require('express');
const router = express.Router();

//importing final controller functions
const newLinkController = require('../controllers/links/newLinkController');
const authUser = require('../middlewares/authUser');
const userExists = require('../middlewares/userExists');

router.post('/links', authUser, userExists, newLinkController);

module.exports = router;