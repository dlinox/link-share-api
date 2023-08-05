//Importing controllers
const getLinkController = require("./getLinkController");
const listLinksController = require("./listLinksController");
const newLinkController = require("./newLinkController");

//Exporting controllers
module.exports = {
    newLinkController,
    listLinksController,
    getLinkController
};

