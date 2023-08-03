const bcrypt = require('bcrypt');
const { v4: uuidv4 } = require('uuid');

const { User } = require('../../models/users');
const getJwtToken = require('../../helpers/jwt-generator');
const getDb = require('../../db/getDb');

// Función controladora final que agrega una foto a una entrada.
const registerUserController = async (req, res, next) => {
    const { email, password, userName } = req.body;
    const id = uuidv4();
    const hashedPass = await bcrypt.hash(password, 10);
    const user = new User(id, email, hashedPass, userName);
    
    let connection;
    try {
        connection = await getDb();

        // comprobar que el email no existe en la base de datos y si existe lanzar error
        let [users] = await connection.query(
            `SELECT * FROM users WHERE email = ?`,
            [email]
        );

        if (users.length > 0) {
            throw new Error('El email ya existe');
        }
        // comprobar que el userName no existe en la base de datos y sino lanzar error
        [users] = await connection.query(
            `SELECT * FROM users WHERE username = ?`,
            [userName]
        )
            if (users.length > 0) {
                throw new Error('El user name ya existe');
            }

        await connection.beginTransaction();

        await connection.query(
            `INSERT INTO users(id, username, email, password) VALUES(?, ?, ?, ?)`,
            [user.id, user.userName, user.email, user.password]
        );

        await connection.commit();
        
        res.status(201).json({
            id,
            email, 
            userName,
            token: getJwtToken(id)
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


module.exports = registerUserController;