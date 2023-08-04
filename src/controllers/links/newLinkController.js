// Importing dependencies model
const insertLinkModel = require('../../models/links/insertLinkModel');

// Final controller function that adds a new entry.
const newLinkController = async (req, res, next) => {
    try {
        const { title, url, description } = req.body;

        // We insert the entry and obtain the assigned id.
        const linkId = await insertLinkModel(
            title,
            url,
            description,
            //req.user.id
        );

        res.send({
            status: 'ok',
            data: {
                entry: {
                    id: linkId,
                    title,
                    url,
                    description,
                    //userId: req.user.id,
                    createdAt: new Date(),
                },
            },
        });
    } catch (err) {
        next(err);
    }
};

module.exports = newLinkController;
