const jwt = require('jsonwebtoken');

const getJwtToken = (id) => {
    // Creamos el token.
    const payload = {id}
    const token = jwt.sign(payload, process.env.SECRET, {
        expiresIn: '3d',
    });
    return token;
}

module.exports = getJwtToken;