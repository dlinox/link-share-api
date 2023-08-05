// Importamos las dependencias.
const uuid = require('uuid');

// Importamos la función que devuelve una conexión con la base de datos.
const getDb = require('../../db/getDb');

// Importamos los errores.
const { voteAlreadyExistsError } = require('../../services/errorService');

// Función que realiza una consulta a la base de datos para votar una entrada.
const insertVoteLinkModel = async (value, linkId, userId) => {
    let connection;

    try {
        connection = await getDb();

        // Comprobamos si ya existe un voto previo por parte del usuario que está intentando
        // votar.
        const [votes] = await connection.query(
            `SELECT id FROM entryVotes WHERE userId = ? AND entryId = ?`,
            [userId, linkId]
        );

        // Si la longitud del array de votos es mayor que cero lanzamos un error indicando
        // que la entrada ya ha sido votada por este usuario.
        if (votes.length > 0) {
            voteAlreadyExistsError();
        }

        // Insertamos el voto.
        await connection.query(
            `INSERT INTO entryVotes(id, value, entryId, userId) VALUES(?, ?, ?, ?)`,
            [uuid.v4(), value, linkId, userId]
        );

        // Obtenemos la media de votos.
        const [votesAvg] = await connection.query(
            `SELECT AVG(value) AS avg FROM entryVotes WHERE entryId = ?`,
            [linkId]
        );

        // Retornamos la media de votos.
        return Number(votesAvg[0].avg);
    } finally {
        if (connection) connection.release();
    }
};

module.exports = insertVoteLinkModel;
