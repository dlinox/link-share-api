const bcrypt = require('bcrypt');
const { v4: uuidv4 } = require('uuid');

const { User } = require('../../models/users');
const getJwtToken = require('../../helpers/jwt-generator');
const getDb = require('../../db/getDb');
const { emailAlreadyRegistered } = require('../../services/errorService');
const { userWithUserNameAlreadyExitsError } = require('../../services/errorService')

// Función controladora final que agrega una foto a una entrada.
const registerUserController = async (req, res, next) => {
    const { email, password, userName } = req.body;
    const id = uuidv4();
    const hashedPass = await bcrypt.hash(password, 10);
    // No funciona
    //const user = new User(id, email, hashedPass, userName);
    //const user = { id, email, hashedPass, userName };

    let connection;
    try {
        connection = await getDb();

        // comprobar que el email no existe en la base de datos y si existe lanzar error
        let [users] = await connection.query(
            `SELECT * FROM users WHERE email = ?`,
            [email]
        );

        if (users.length > 0) {
            emailAlreadyRegistered();
        }
        // comprobar que el userName no existe en la base de datos y sino lanzar error
        [users] = await connection.query(
            `SELECT * FROM users WHERE username = ?`,
            [userName]
        )
            if (users.length > 0) {
                userWithUserNameAlreadyExitsError();
            }

        await connection.beginTransaction();

        await connection.query(
            `INSERT INTO users(id, username, email, password) VALUES(?, ?, ?, ?)`,
            [id, userName, email, hashedPass]
        );

        await connection.commit();
        
        res.status(201).json({
            id,
            email, 
            userName,
            token: getJwtToken(id)
        });

    } catch (err) {
        
        await connection.rollback();

        next(err); 
    } finally {
        if (connection) connection.release();
    }
}

module.exports = registerUserController;
