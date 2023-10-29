//Importing controllers
const deteleLinkByIdController = require('./deteleLinkByIdController');
const getLinkController = require('./getLinkController');
const listLinksController = require('./listLinksController');
const newLinkController = require('./newLinkController');
const votePostedLinkController = require('./votePostedLinkController');
const getLinkPreviewController = require('./getLinkPreviewController');

//Exporting controllers
module.exports = {
    getLinkController,
    listLinksController,
    newLinkController,
    votePostedLinkController,
    deteleLinkByIdController,
    getLinkPreviewController,
};
