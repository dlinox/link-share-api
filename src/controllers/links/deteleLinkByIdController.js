const { deteleLinkPostByIdModel } = require("../../models/links");
const selectLinkPostByIdModel = require("../../models/links/selectLinkPostByIdModel");
const { cannotDeleteOtherUserLinkError } = require("../../services/errorService");


    const deteleLinkByIdController = async (req, res, next) => {
        try {
        //req.userId
        const { linkId } = req.params;
    
        const link = await selectLinkPostByIdModel(linkId);
    
        if (req.userId !== link.user_id) {
            cannotDeleteOtherUserLinkError();
        }
    
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
