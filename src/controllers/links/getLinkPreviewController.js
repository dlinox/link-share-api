// const linkPreviewGenerator = require('link-preview-generator');

const getLinkPreviewController = async (req, res, next) => {
    try {
        const { url } = req.query;

        // Obtén la previsualización del enlace
        // const resPreview = await linkPreviewGenerator(url);

        let dataResponse = {
            status: 'ok',
            data: {
                title: 'Heroicons',
                description:
                    'Beautiful hand-crafted SVG icons, by the makers of Tailwind CSS.',
                domain: 'heroicons.com',
                img: 'https://heroicons.com/_next/static/media/social-card.fefc68e0.jpg',
                favicon: 'https://heroicons.com/favicon.ico',
            },
            message: 'success',
        };

        // if (resPreview.status === 'error') {
        //     dataResponse.status = 'error';
        //     dataResponse.message = resPreview.message;
        // } else {
        //     dataResponse.message = 'success';
        //     dataResponse.data = resPreview;
        // }

        res.json(dataResponse);
    } catch (err) {
        next(err);
    }
};

module.exports = getLinkPreviewController;
