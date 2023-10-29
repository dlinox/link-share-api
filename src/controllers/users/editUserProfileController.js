const getDb = require('../../db/getDb');
const { updateUserProfileModel } = require('../../models/users');
const {
    userWithUserNameAlreadyExitsError,
    emailAlreadyRegistered,
} = require('../../services/errorService');

const editUserProfileController = async (req, res, next) => {
    let connection;
    try {
        connection = await getDb();
        const { userName, email } = req.body;

        // Check if the email doesn't exist in the database, and if it does, throw an error.
        let [users] = await connection.query(
            `SELECT * FROM users WHERE email = ? AND id != ?`,
            [email, req.user.id]
        );

        if (users.length > 0) {
            emailAlreadyRegistered();
        }

        // Check if the userName doesn't exist in the database, and if it does, throw an error.
        [users] = await connection.query(
            `SELECT * FROM users WHERE username = ? AND id != ?`,
            [userName, req.user.id]
        );

        if (users.length > 0) {
            userWithUserNameAlreadyExitsError();
        }

        await updateUserProfileModel(userName, email, req.user.id);

        res.send({
            status: 'ok',
            message: 'profile updated',
        });
    } catch (err) {
        next(err);
    }
};

module.exports = editUserProfileController;
