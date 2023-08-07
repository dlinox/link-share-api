//Importing controllers
const getLinkController = require("./getLinkController");
const voteLinkController = require("./voteLinkController");
const listLinksController = require("./listLinksController");
const newLinkController = require("./newLinkController");

//Exporting controllers
module.exports = {
    getLinkController,
    voteLinkController,
    listLinksController,
    newLinkController
};
