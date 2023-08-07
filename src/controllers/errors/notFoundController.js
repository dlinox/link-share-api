const { notFoundError } = require('../../services/errorService');

const notFound = (req, res, next) => {
    next(notFoundError('route'));
};

module.exports = notFound;
