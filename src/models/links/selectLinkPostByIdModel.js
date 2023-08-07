// Importamos la función que devuelve una conexión con la base de datos.
const getDb = require('../../db/getDb');

// Función que realiza una consulta a la base de datos para obtener información de una
// entrada concreta.
const selectLinkPostByIdModel = async (linkId, userId = '') => {
    let connection;

    try {
        connection = await getDb();

        // Obtenemos la información necesaria de la entrada.
        const [links] = await connection.query(
            `
                SELECT 
                    L.id,
                    L.title,
                    L.url, 
                    L.description,
                    L.userId,
                    U.username,
                    BIT_OR(V.userId = ?) AS votedByMe, 
                    L.userId = ? AS owner,
                    AVG(IFNULL(V.value, 0)) AS votes,
                    L.createdAt
                FROM links L 
                LEFT JOIN votes V ON V.linkId = L.id
                INNER JOIN users U ON U.id = L.userId
                WHERE L.id = ?
                GROUP BY L.id
                ORDER BY L.createdAt DESC
            `,
            [userId, userId, linkId]
        );

        // stating "votedByMe" y "owner" as boolean
        links[0].votedByMe = Boolean(links[0].votedByMe);
        links[0].owner = Boolean(links[0].owner);

        // The average of votes is a value of type String. We convert it to Number.
        links[0].votes = Number(links[0].votes);

        return {
            ...links[0],
        };
        
    } finally {
        if (connection) connection.release();
    }
};

module.exports = selectLinkPostByIdModel;
