// importing dependencies
const express = require('express');
const router = express.Router();

//importing final controller functions
const newLinkController = require('../controllers/links/newLinkController');

router.post('/links',newLinkController);

module.exports = router;