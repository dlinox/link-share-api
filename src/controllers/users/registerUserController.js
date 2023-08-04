//importing dependecies
const bcrypt = require('bcrypt');
const { v4: uuidv4 } = require('uuid');

// importing model fuction to be able to access the user in the db
const { User } = require('../../models/users');

//importing function to encrypt passwords
const getJwtToken = require('../../helpers/jwt-generator');

//importing database
const getDb = require('../../db/getDb');

//importing errors
const { emailAlreadyRegistered } = require('../../services/errorService');
const { userWithUserNameAlreadyExitsError } = require('../../services/errorService')

// Final controller function that adds a photo to an entry.
const registerUserController = async (req, res, next) => {
    const { email, password, userName } = req.body;
    const id = uuidv4();
    const hashedPass = await bcrypt.hash(password, 10);
    // Doesn't work
    //const user = new User(id, email, hashedPass, userName);
    //const user = { id, email, hashedPass, userName };

    let connection;
    try {
        connection = await getDb();

        // Check if the email doesn't exist in the database, and if it does, throw an error.
        let [users] = await connection.query(
            `SELECT * FROM users WHERE email = ?`,
            [email]
        );

        if (users.length > 0) {
            emailAlreadyRegistered();
        }
        // Check if the userName doesn't exist in the database, and if it does, throw an error.
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
