const updatePasswordWithCodeController =  async(req, res, next) => {
    
    try {
       const { email, code } = req.body
        res.status(201).json({
            email, code
        });
    } catch (err) {
        next(err); 
    } 
}

module.exports = updatePasswordWithCodeController;