module.exports = {
    notAuthenticatedError() {
        throw {
            httpStatus: 401, // Unauthorized
            code: 'NOT_AUTHENTICATED',
            message: `Debes enviar un token en el header 'Authorization'`,
        };
    },
    notFoundError(resource) {
        throw {
            httpStatus: 404, // Not Found
            code: 'RESOURCE_NOT_FOUND',
            message: `El recurso requerido '${resource}' no existe`,
        };
    },
    invalidCredentialsError() {
        throw {
            httpStatus: 401, // Unauthorized
            code: 'INVALID_CREDENTIALS',
            message: 'Credenciales inválidas',
        };
    },
    userWithUserNameAlreadyExitsError() {
        throw {
            httpStatus: 401,
            code: 'INVALID_CREDENTIALS',
            message:'Ya existe un usuario con este username'
        }
    },
    emailAlreadyRegistered() {
        throw {
            httpStatus: 401,
            code: 'INVALID_CREDENTIALS',
            message:'El email ya se encuentra registrado'
        }
    }
};
