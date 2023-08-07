// Importamos la función que devuelve una conexión con la base de datos.
const getDb = require('../db/getDb');

// Importamos los errores.
const { notFoundError } = require('../services/errorService');

const linkPostExists = async (req, res, next) => {
    let connection;

    try {
        connection = await getDb();

        // Obtenemos el id de la entrada de los path params.
        const { linkId } = req.params;

        const [links] = await connection.query(
            `SELECT id FROM links WHERE id = ?`,
            [linkId]
        );

        // we send an error if the link posted doesnt exists.
        if (links.length < 1) {
            notFoundError('link');
        }

        // Pasamos el control a la siguiente función controladora.
        next();

    } catch (err) {
        next(err);

    } finally {
        if (connection) connection.release();
    }
};

module.exports = linkPostExists;
