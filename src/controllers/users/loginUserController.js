const loginUserController = async (req, res, next) => {
    const { email, password } = req.body;
    res.status(201).json({email, password});
}

module.exports = loginUserController;