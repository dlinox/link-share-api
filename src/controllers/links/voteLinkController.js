// Importing models
const selectLinkPostByIdModel = require('../../models/links/selectLinkPostByIdModel');
const insertvoteLinkModel = require('../../models/links/insertVoteLinkModel');

// Importing services
const validateSchemaService = require('../../services/validateSchemaService');

// Importing schemas
const voteLinkSchema = require('../../schema/links/voteLinkSchema');

// Importing errors
const { cannotvoteYourOwnLinkError } = require('../../services/errorService');

// Final controller function that allows liking on an link.
const voteLinkController = async (req, res, next) => {
    try {
        const { linkId } = req.params;
        const { value } = req.body;

        // Validate the body with Joi.
        await validateSchemaService(voteLinkSchema, req.body);

        // We get the post details.
        const link = await selectLinkPostByIdModel(linkId);

        // If we are the owners of the link we throw an error.
        if (link.userId === req.user.id) {
            cannotvoteYourOwnLinkError();
            
        }

        // We insert the vote and obtain the new mean.
        const votesAvg = await insertvoteLinkModel(value, linkId, req.user.id);

        res.send({
            status: 'ok',
            data: {
                votesAvg,
            },
        });
        
    } catch (err) {
        next(err);
    }
};

module.exports = voteLinkController;
