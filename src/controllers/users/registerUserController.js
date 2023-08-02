const bcrypt = require('bcrypt');
const { v4: uuidv4 } = require('uuid');
const User = require('../../models/user');

// Función controladora final que agrega una foto a una entrada.
const registerUserController = async (req, res, next) => {
    const { email, password, userName } = req.body;
    const id = uuidv4();
    const hashedPass = await bcrypt.hash(password, 10);
    const user = new User(id, email, hashedPass, userName);
    console.log(user);
    res.status(201).json(user);
}


module.exports = registerUserController;