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
    'string.min': 'El campo "{#key}" debe tener al menos {#limit} caracteres',
    'string.max': 'El campo "{#key}" no debe exceder los {#limit} caracteres',
    'object.unknown': 'No se permiten campos adicionales en este objeto',
};

// Dado que existe la posibilidad de enviar tres fotos al crear la entrada, vamos a crear
// el esquema de las fotos.
const photoSchema = joi
    .object({
        name: joi.string().required().messages(joiErrorMessages),
        mimetype: joi
            .string()
            .valid('image/jpeg', 'image/png')
            .required()
            .messages(joiErrorMessages),
        size: joi.number().max(5000000).required().messages(joiErrorMessages),
    })
    .unknown(true);

// Creamos el esquema de Joi donde comprobamos todas las propiedades necesarias.
const newEntrySchema = joi.object({
    title: joi.string().min(5).max(50).required().messages(joiErrorMessages),
    place: joi.string().min(3).max(30).required().messages(joiErrorMessages),
    description: joi
        .string()
        .min(10)
        .max(500)
        .required()
        .messages(joiErrorMessages),
    photoA: photoSchema.optional().messages(joiErrorMessages),
    photoB: photoSchema.optional().messages(joiErrorMessages),
    photoC: photoSchema.optional().messages(joiErrorMessages),
});

module.exports = newEntrySchema;
