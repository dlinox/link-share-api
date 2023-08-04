// Importamos los modelos.
const selectLinkPostByIdModel = require('../../models/links/selectLinkPostByIdModel');

// Función controladora final que retorna una entrada con un id dado.
const getLinkController = async (req, res, next) => {
    try {
        // Obtenemos el id de la entrada.
        const { linkId } = req.params;

        // Dado que queremos permitir que un usuario no logeado acceda a este controlador,
        // habrá momentos en los que no exista "req.user". Con la interrogación indicamos
        // a JavaScript que "user" puede ser undefined.
        const link = await selectLinkPostByIdModel(linkId, req.user?.id);

        res.send({
            status: 'ok',
            data: {
                link,
            },
        });
    } catch (err) {
        next(err);
    }
};

module.exports = getLinkController;
