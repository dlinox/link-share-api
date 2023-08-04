// Importing the function that returns a connection to the database.
const getDb = require('../../db/getDb');

// Function that performs a query to the database to obtain the list of links posted.
const selectAllEntriesModel = async (keyword = '', userId = '') => {
    let connection;

    try {
        connection = await getDb();

        // Get the list of links posted.
        const [links] = await connection.query(
            `
                SELECT 
                    E.id,
                    E.title,
                    E.url, 
                    U.username,
                    E.userId = ? AS owner,
                    E.createdAt
                FROM links E
                LEFT JOIN likesVotes V ON V.linkId = E.id
                INNER JOIN users U ON U.id = E.userId
                WHERE E.title LIKE ? OR E.url LIKE ? OR E.description LIKE ?
                GROUP BY E.id
                ORDER BY E.createdAt DESC
            `,
            [userId, userId, `%${keyword}%`, `%${keyword}%`, `%${keyword}%`]
        );

      // We return the links posted.
        return links;
    } finally {
        if (connection) connection.release();
    }
};

module.exports = selectAllEntriesModel;
