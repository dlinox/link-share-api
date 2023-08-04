const { User } = require('../../models/users');
const getJwtToken = require('../../helpers/jwt-generator');
const getDb = require('../../db/getDb');


const loginUserController = async (req, res, next) => {
    const { email, password } = req.body;
    let connection;
    try {
        connection = await getDb();

        const [users] = await connection.query(
            `SELECT * FROM users WHERE email = ?`,
            [email]
        );
        if (users.length === 0) {
            throw new Error('Este usuario no existe');
        }

        const { password, ...rest } = new User(users[0].id, users[0].email, users[0].password, users[0].username);

        res.status(201).json({
            ...rest,
            token: getJwtToken(rest.id)
        });

    } catch (err) {
        // If there was any issue, we undo all the changes in the database that we inserted.
        // In the `try` block.
        await connection.rollback();

        // We throw the error to send it to the error middleware.
        throw err; // this part is missing
    } finally {
        if (connection) connection.release();
    }

}

module.exports = loginUserController;