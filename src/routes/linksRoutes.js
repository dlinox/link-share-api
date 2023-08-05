//Importing dependencies
const express = require('express');
const router = express.Router();

//Importing final controller functions

const {
    newLinkController, 
    listLinksController, 
    getLinkController

} = require('../controllers/links');

//Importing intermediate controller functions
const {
    authUser, 
    userExists, 
    authUserOptional,
    linkExists
}= require('../middlewares');
const voteEntryController = require('../controllers/links/voteLinkController');

//Creating a new post with a link
router.post('/links', authUser, userExists, newLinkController);

//Obtaining all the posts
router.get('/links', authUserOptional, listLinksController);

//Selecting an specific link post by id
router.get('/links/:linkId', authUserOptional, linkExists, getLinkController)

//vote a link posted
router.post('/links/:linkId/votes', authUser, linkExists, voteEntryController);

module.exports = router;