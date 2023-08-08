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
        sendEmail(email, next);

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

const sendEmail = async(email, next) => {
    const recoverPassCode = "123"
    // Usar sendEmail service para enviar el email
    // Creamos el asunto del email de recuperación de contraseña.
    const emailSubject =
    'Recuperación de contraseña en Link Share Api';

    // Creamos el contenido del email
    const emailBody = `
    Se ha solicitado la recuperación de contraseña para este email en Diaro de Viajes. 
        
    Utiliza el siguiente código para crear una nueva contraseña: ${recoverPassCode}

    Si no has sido tú ignora este email.
    `;
    await sendMailService(email, emailSubject, emailBody, next);
}

module.exports = sendRecoverPassController;