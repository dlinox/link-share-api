const randomstring = require('randomstring');

const getDb = require('../../db/getDb');
const { invalidCredentialsError } = require('../../services/errorService');
const sendMailService = require('../../services/sendEmailService');
const validateSchemaService = require('../../services/validateSchemaService');
const { recoverPassSchema } = require('../../schema/users');

const sendRecoverPassController =  async(req, res, next) => {
    let connection;
    try {
        connection = await getDb();
        let { email } = req.body;
        await validateSchemaService(recoverPassSchema, { email }, next);
        
        const [users] = await connection.query(
            `SELECT email FROM users WHERE email = ?`,
            [email]
        );

        email = users[0].email;

        if (!email) {
            invalidCredentialsError();
        }
        const recoverPassCode = randomstring.generate(10);

        sendEmail(email, recoverPassCode, next);

        res.status(201).json({
            status:'ok',
            messages:'We have sent you an email. Please check your inbox.'
        });
    } catch (err) {
        
        await connection.rollback();

        next(err); 
    } finally {
        if (connection) connection.release();
    }
}

const sendEmail = async(email, recoverPassCode, next) => {
    // We create the subject of the password recovery email.
    const emailSubject =
    'Password recovery in Link Share Api';

    // Create the email content
    const emailBody = `
    Password recovery has been requested for this email in Link Share Api. 
        
    Use the following code to create a new password: ${recoverPassCode}

    If it was not you, please ignore this email.
    `;
    await sendMailService(email, emailSubject, emailBody, next);
}

module.exports = sendRecoverPassController;