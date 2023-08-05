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
                    E.id,
                    E.title,
                    E.url, 
                    E.description,
                    E.userId,
                    U.username,
                    BIT_OR(V.userId = ?) AS votedByMe, 
                    E.userId = ? AS owner,
                    AVG(IFNULL(V.value, 0)) AS votes,
                    E.createdAt
                FROM entries E
                LEFT JOIN linkVotes V ON V.linkId = E.id
                INNER JOIN users U ON U.id = E.userId
                WHERE E.id = ?
                GROUP BY E.id
                ORDER BY E.createdAt DESC
            `,
            [userId, userId, linkId]
        );

        // Establecemos como valores booleanos "votedByMe" y "owner"
        links[0].votedByMe = Boolean(links[0].votedByMe);
        links[0].owner = Boolean(links[0].owner);

        // La media de votos es un valor de tipo String. Podemos convertirla a Number.
        links[0].votes = Number(links[0].votes);

        return {
            ...links[0],
        };
        
    } finally {
        if (connection) connection.release();
    }
};

module.exports = selectLinkPostByIdModel;
