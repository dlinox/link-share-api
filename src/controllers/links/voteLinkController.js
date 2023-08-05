// Importamos los modelos.
const selectLinkPostByIdModel = require('../../models/links/selectLinkPostByIdModel');
const insertVoteLinkModel = require('../../models/links/insertVoteLinkModel');

// Importamos los servicios. 
const validateSchemaService = require('../../services/validateSchemaService');

// Importamos el esquema.
const voteLinkSchema = require('../../schema/links/voteLinkSchema');

// Importamos los errores. 
const { cannotVoteOwnEntryError } = require('../../services/errorService');

// Función controladora final que permite votar una entrada.
const voteLinkController = async (req, res, next) => {
    try {
        const { linkId } = req.params;
        const { value } = req.body;

        // Validamos el body con Joi.
        await validateSchemaService(voteLinkSchema, req.body, next);

        // Obtenemos los detalles de la entrada.
        const entry = await selectLinkPostByIdModel(linkId);

        // Si somos los dueños de la entrada lanzamos un error.
        if (entry.userId === req.user.id) {
            cannotVoteOwnEntryError();
        }

        // Insertamos el voto y obtenemos la nueva media.
        const votesAvg = await insertVoteLinkModel(value, linkId, req.user.id);

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
