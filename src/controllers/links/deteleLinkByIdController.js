const { deteleLinkPostByIdModel } = require("../../models/links");
const selectLinkPostByIdModel = require("../../models/links/selectLinkPostByIdModel");
const { cannotDeleteOtherUserLinkError } = require("../../services/errorService");


    const deteleLinkByIdController = async (req, res, next) => {
        try {
        //req.userId
        const { linkId } = req.params;
    
        // Conseguir la información del tweet que quiero borrar
        const link = await selectLinkPostByIdModel(linkId);
    
        // Comprobar que el usuario del token es el mismo que creó el tweet
        if (req.userId !== link.user_id) {
            cannotDeleteOtherUserLinkError();
        }
    
        // Borrar el tweet
        await deteleLinkPostByIdModel(linkId);

        res.send({
            status: 'ok',
            message: `the link post with id: ${linkId} has been erased`,
        });
        } catch (err) {
        next(err);
        }
    };
    
    module.exports = deteleLinkByIdController;
