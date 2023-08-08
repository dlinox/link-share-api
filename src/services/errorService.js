module.exports = {
    cannotVoteOwnEntryError() {
        throw {
            httpStatus: 403, // Forbidden
            code: 'CANNOT_VOTE_OWN_ENTRY',
            message: 'No puedes votar tu propia entrada',
        };
    },
    
    emailAlreadyRegistered() {
        throw {
            httpStatus: 401,// Unauthorized
            code: 'INVALID_CREDENTIALS',
            message:'El email ya se encuentra registrado'
        }
    },

    invalidCredentialsError() {
        throw {
            httpStatus: 401, // Unauthorized
            code: 'INVALID_CREDENTIALS',
            message: 'Credenciales inválidas',
        };
    },
    
    missingFieldsError() {
        throw {
            httpStatus: 400, // bad request
            code: 'MISSING FIELDS',
            message: 'faltan campos',
        };
    },

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

    sendEmailError() {
        throw {
            httpStatus: 500, // Internal server error
            code: 'SEND_EMAIL_FAILED',
            message: 'Error al enviar email',
        };
    },

    userWithUserNameAlreadyExitsError() {
        throw {
            httpStatus: 401, // Unauthorized
            code: 'INVALID_CREDENTIALS',
            message:'Ya existe un usuario con este username'
        }
    },


    voteAlreadyExistsError() {
        throw {
            httpStatus: 409, // Conflict
            code: 'VOTE_ALREADY_EXISTS',
            message: 'No se puede votar más de una vez la misma entrada',
        };
    }
};