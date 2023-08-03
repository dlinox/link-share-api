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
        // Si hubo algún problema deshacemos todos los cambios en la base de datos que insertáramos
        // en el bloque try.
        await connection.rollback();

        // Arrojamos el error para enviarlo al middleware de error.
        throw err; // Falta esta parte
    } finally {
        if (connection) connection.release();
    }

}

module.exports = loginUserController;