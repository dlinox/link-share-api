const bcrypt = require('bcrypt');
const { v4: uuidv4 } = require('uuid');

const User = require('../../models/user');
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

        // comprobar que el id no existe en la base de datos y si existe lanzar error

        // comprobar que el email no existe en la base de datos y sino lanzar error

        await connection.beginTransaction();

        await connection.query(
            `INSERT INTO users(id, username, email, password) VALUES(?, ?, ?, ?)`,
            [user.id, user.userName, user.email, user.password]
        );

        await connection.commit();

    } catch (err) {
        // Si hubo algún problema deshacemos todos los cambios en la base de datos que insertáramos
        // en el bloque try.
        await connection.rollback();

        // Arrojamos el error para enviarlo al middleware de error.
        throw err; // Falta esta parte
    } finally {
        if (connection) connection.release();
    }



    res.status(201).json({
        id,
        email, 
        userName,
        token: getJwtToken(id)
    });
}


module.exports = registerUserController;