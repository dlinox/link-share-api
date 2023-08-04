// Importing the model
const insertLinkModel = require('../../models/links/insertLinkModel');

//Importing errors
const { missingFieldsError } = require('../../services/errorService');

// Controller function that controls a new link entry 
const newLinkController = async (req, res, next) => {
    try {
        const { id, title, url, description } = req.body;

        if(!title || !url || !description ) {
            throw missingFieldsError();
            
        }

        // Inserting the new link entry in the db and we get the assigned ID
        const linkId = await insertLinkModel(
            id,
            title,
            url,
            description,
            req.user.id
        );

        res.send({
            status: 'ok',
            data: {
                link: {
                    id: linkId,
                    title,
                    url,
                    description,
                    userId: req.user.id,
                    createdAt: new Date(),
                },
            },
        });

    } catch (err) {
        next(err);
    }
};

module.exports = newLinkController;
