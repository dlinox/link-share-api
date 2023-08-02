// Función controladora final que agrega una foto a una entrada.
const registerUserController = async (req, res, next) => {
    const { email, password, userName, avatar } = req.body;
    res.status(201).json({email, password, userName, avatar});
}

module.exports = registerUserController;