const joi = require('joi');

// Modificamos los mensajes de error de Joi que necesitemos.
const joiErrorMessages = {
    'string.base': 'El valor de "{#key}" debe ser una cadena',
    'any.required': 'El campo "{#key}" es requerido',
    'string.empty': 'El campo "{#key}" no debe estar vacío',
    'number.base': 'El valor de "{#key}" debe ser un número',
    'number.max': 'El archivo no debe exceder los 5 MB',
    'object.base': 'El valor de "{#key}" debe ser un objeto',
    'any.only': 'Solo se permiten fotos jpeg o png',
};

// Creamos el esquema de Joi donde comprobamos todas las propiedades necesarias.
const editUserAvatarSchema = joi.object({
    avatar: joi
        .object({
            name: joi.string().required().messages(joiErrorMessages),
            mimetype: joi
                .string()
                .valid('image/jpeg', 'image/png')
                .required()
                .messages(joiErrorMessages),
            size: joi
                .number()
                .max(5000000)
                .required()
                .messages(joiErrorMessages),
        })
        .unknown(true)
        .messages(joiErrorMessages),
});

module.exports = editUserAvatarSchema;
