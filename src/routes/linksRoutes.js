//Importing dependencies
const express = require('express');
const router = express.Router();


//Importing intermediate controller functions
const {
    authUser, 
    userExists, 
    authUserOptional,
    linkExists
}= require('../middlewares');

//Importing final controller functions

const {
    getLinkController,
    listLinksController, 
    voteLinkController,
    newLinkController, 
    
} = require('../controllers/links');


//Creating a new post with a link
router.post('/links', authUser, userExists, newLinkController);

//Obtaining all the posts
router.get('/links', authUserOptional, listLinksController);

//Selecting an specific link post by id
router.get('/links/:linkId', authUserOptional, linkExists, getLinkController)

//vote a link posted
router.post('links/:linkId/votes', authUser, userExists, linkExists, voteLinkController);

module.exports = router;