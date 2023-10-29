const bcrypt = require('bcrypt');

const getDb = require('../../db/getDb');

const updateUserPassModel = async (userName, email, userId) => {
    let connection;

    try {
        connection = await getDb();

        const [users] = await connection.query(
            `SELECT password FROM users WHERE id = ?`,
            [userId]
        );

        await connection.query(`UPDATE users SET email  = ? ,  username = ?  WHERE id = ?`, [
            email,
            userName,
            userId,
        ]);
    } finally {
        if (connection) connection.release();
    }
};

module.exports = updateUserPassModel;
