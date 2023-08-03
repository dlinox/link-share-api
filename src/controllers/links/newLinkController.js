// Importamos los modelos.
const insertLinkModel = require('../../models/links/insertLinkModel');

// Función controladora final que agrega una nueva entrada.
const newLinkController = async (req, res, next) => {
    try {
        const { title, url, description } = req.body;

        // Insertamos la entrada y obtenemos el id que se le ha asignado.
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
