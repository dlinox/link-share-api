// Importing the function that returns a connection to the database.
const getDb = require('../../db/getDb');
const { parseISO, format } = require('date-fns');
const { es } = require('date-fns/locale');
// Function that performs a query to the database to obtain the list of links posted.
const selectAllLinkPostsModel = async ({
    keyword = '',
    day = '',
    username = '',
    userId = '',
}) => {
    let connection;

    try {
        connection = await getDb();
        console.log(connection);

        // Get the list of links posted.
        const [links] = await connection.query(
            `SELECT 
                L.id,
                L.title,
                L.description,
                L.domain,
                L.favicon,
                L.image,
                L.url, 
                U.username,
                U.avatar,
                BIT_OR(V.userId = ?) AS votedByMe, 
                L.userId = ? AS owner,
                AVG(IFNULL(V.value, 0)) AS votes,
                L.createdAt
            FROM links L
            LEFT JOIN votes V ON V.linkId = L.id
            INNER JOIN users U ON U.id = L.userId
            WHERE ( L.title LIKE ? OR L.url LIKE ? OR L.description LIKE ? ) AND L.createdAt LIKE ? AND  U.username LIKE  ?
            GROUP BY L.id
            ORDER BY L.createdAt DESC
    `,
            [
                userId,
                userId,
                `%${keyword}%`,
                `%${keyword}%`,
                `%${keyword}%`,
                `${day}%`,
                `%${username}%`,
            ]
        );

        for (const link of links) {
            const fecha = parseISO(link.createdAt);

            // stating "votedByMe" y "owner" as boolean
            link.votedByMe = Boolean(link.votedByMe);
            link.owner = Boolean(link.owner);
            const fechaFormateada = format(
                link.createdAt,
                "MMMM dd 'del' yyyy",
                {
                    locale: es,
                }
            ); // 'es' es para español
            link.createdAt = fechaFormateada;

            // The average of votes is a value of type String. We convert it to Number.
            link.votes = Number(link.votes);
        }

        return links;
    } finally {
        if (connection) connection.release();
    }
};

module.exports = selectAllLinkPostsModel;
