//Importing dependencies
const express = require('express');
const router = express.Router();

//Importing final controller functions

const {
    newLinkController, 
    listLinksController, 

} = require('../controllers/links');

//Importing intermediate controller functions
const {
    authUser, 
    userExists, 
    authUserOptional
}= require('../middlewares');

//Creating a new post with a link
router.post('/links', authUser, userExists, newLinkController);

//Obtaining all the posts
router.get('/links', authUserOptional, listLinksController)

module.exports = router;