const linkPreviewGenerator = require('link-preview-generator');

const getLinkPreviewController = async (req, res, next) => {
    try {
        const { url } = req.query;

        // Obtén la previsualización del enlace
        const resPreview = await linkPreviewGenerator(url);

        let dataResponse = {
            status: 'ok',
            data: null,
            message: null,
        };

        if (resPreview.status === 'error') {
            dataResponse.status = 'error';
            dataResponse.message = resPreview.message;
        } else {
            dataResponse.message = 'success';
            dataResponse.data = resPreview;
        }

        res.json(dataResponse);
    } catch (err) {
        next(err);
    }
};

module.exports = getLinkPreviewController;
