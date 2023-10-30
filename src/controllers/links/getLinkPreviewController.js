const { URL } = require('url');

const getMetaDataLink = async (_url) => {
    try {
        let fetch = await import('node-fetch');
        const cheerio = require('cheerio');
        let res = await fetch.default(_url);
        let html = await res.text();
        const $ = cheerio.load(html);

        const myURL = new URL(_url);
        const domain = myURL.hostname;

        const title = $('title').text();
        const description = $('meta[name="description"]').attr('content');
        const image = $('meta[property="og:image"]').attr('content');

        const icon = $('link[type="image/x-icon"]').attr('href');
        // icon = icon === undefined ? $('link[rel="icon"]').attr('href') : icon;

        const metadata = {
            title: title === undefined ? null : title,
            description:
                description === undefined ? 'Sin descripción' : description,
            img: image === undefined ? null : image,
            favicon: icon === undefined ? null : icon,
            domain: domain === undefined ? null : domain,
        };
        return metadata;
    } catch (error) {
        return false;
    }

    // metadataResponse = metadata;
};

const getLinkPreviewController = async (req, res, next) => {
    try {
        const { url } = req.query;

        let resPreview = await getMetaDataLink(url);

        let dataResponse = {
            status: 'ok',
            data: null,
            message: null,
        };

        if (!resPreview) {
            dataResponse.status = 'error';
            dataResponse.message = 'Invalid url';
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
