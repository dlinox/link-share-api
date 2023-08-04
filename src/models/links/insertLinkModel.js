// importing dependencies
const uuid = require('uuid');

// importing database
const getDb = require('../../db/getDb');

// function that goes to the database to insert a new link
const insertLinkModel = async (title, url, description, userId) => {
    let connection;

    try {
        connection = await getDb();

        // generation linkId
        const linkId = uuid.v4();

        // create the link post
        const [link] = await connection.query(
            `INSERT INTO links(title, url, description, userId) VALUES(?, ?, ?, ?)`,
            [title, url, description, userId]
        );

        // returning the id of the link
        return linkId;

    } finally {
        if (connection) connection.release();
    }
};

module.exports = insertLinkModel;
