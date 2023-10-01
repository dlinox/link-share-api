
//importing database
const getDb = require('../../db/getDb');

const randomstring = require('randomstring');

const { updateRecoveryPassCodeModel } = require('../../models/users');
const sendMailService = require('../../services/sendEmailService');



const sendRecoverPassController =  async(req, res, next) => {
    
    let connection;
    try {
        connection = await getDb();
        
        const recoverPassCode = randomstring.generate(10);
        const { email } = req.body;

     

        let [users] = await connection.query(
            `SELECT * FROM users WHERE email = ?`,
            [email]
        );

        if (users.length > 0) {
            res.status(201).json({
                status:'ok',
                message:'We have sent you an email. Please check your inbox.',
                data: users
            });

            await updateRecoveryPassCodeModel(email, recoverPassCode, next);
            sendEmail(email, recoverPassCode, next);
        }
        else{
            res.status(401).json({
                status:'error',
                message:'The entered email is not in our records.'
            });
        }
       
    } catch (err) {
        next(err); 
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