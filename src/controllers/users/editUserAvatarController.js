// Importamos los modelos.
const selectUserByIdModel = require('../../models/users/selectUserByIdModel');
const updateUserAvatarModel = require('../../models/users/updateUserAvatarModel');

// Importamos los servicios.
const savePhotoService = require('../../services/savePhotoService');
const deletePhotoService = require('../../services/deletePhotoService');

// Importamos los servicios.
const validateSchemaService = require('../../services/validateSchemaService');

// Importamos el esquema.
const { editUserAvatarSchema } = require('../../schema/users');

const editUserAvatarController = async (req, res, next) => {
    try {
        // Validamos el body con Joi. Si "files" no existe enviamos un objeto vacío.
        await validateSchemaService(editUserAvatarSchema, req.files || {});

        // Obtenemos los datos del usuario para comprobar si ya tiene un avatar previo.
        const user = await selectUserByIdModel(req.user.id);

        // Si el usuario tiene un avatar previo lo eliminamos.
        if (user.avatar) {
            await deletePhotoService(user.avatar);
        }

        // Guardamos el avatar en la carpeta de subida de archivos. Redimensionamos a un ancho
        // de 100 píxeles.
        console.log(req.files.avatar);
        const avatarName = await savePhotoService(req.files.avatar, 100);

        // Actualizamos los datos del usuario con el nombre de avatar que hemos obtenido.
        await updateUserAvatarModel(avatarName, req.user.id);

        res.send({
            status: 'ok',
            message: 'Usuario actualizado',
        });
    } catch (err) {
        next(err);
    }
};

module.exports = editUserAvatarController;
