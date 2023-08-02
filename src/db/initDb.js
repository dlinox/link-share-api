// Leemos el fichero ".env" con "dotenv" y hacemos que todas las variables de dicho fichero
// esten disponibles en la lista de variables de entorno del proceso actual.
require('dotenv').config();

const getDb = require('./getDb');

const main = async () => {
    // Variable que almacenará una conexión con la base de datos.
    let connection;

    try {
        connection = await getDb();

        console.log('Deleting tables...');

        await connection.query(
            'DROP TABLE IF EXISTS entryVotes, entryPhotos, entries, users'
        );

        console.log('Creating tables...');

        // Creamos la tabla de usuarios.
        await connection.query(`
            CREATE TABLE IF NOT EXISTS users (
                id CHAR(36) PRIMARY KEY NOT NULL,
                email VARCHAR(100) UNIQUE NOT NULL,
                username VARCHAR(30) UNIQUE NOT NULL,
                password VARCHAR(100) NOT NULL,
                avatar VARCHAR(100),
                role ENUM('admin', 'anonymous', 'normal') DEFAULT 'normal',
                createdAt DATETIME DEFAULT CURRENT_TIMESTAMP, 
                modifiedAt DATETIME ON UPDATE CURRENT_TIMESTAMP
            )	
        `);

        // Creamos la tabla de entradas.
        await connection.query(`
            CREATE TABLE IF NOT EXISTS entries (
                id CHAR(36) PRIMARY KEY NOT NULL,
                title VARCHAR(50) NOT NULL,
                place VARCHAR(30) NOT NULL,
                description TEXT NOT NULL,
                userId CHAR(36) NOT NULL,
                createdAt DATETIME DEFAULT CURRENT_TIMESTAMP, 
                FOREIGN KEY (userId) REFERENCES users(id)
            )
        `);

        // Creamos la tabla de fotos.
        await connection.query(`
            CREATE TABLE IF NOT EXISTS entryPhotos (
                id CHAR(36) PRIMARY KEY NOT NULL,
                name VARCHAR(100) NOT NULL,
                entryId CHAR(36) NOT NULL,
                FOREIGN KEY (entryId) REFERENCES entries(id),
                createdAt DATETIME DEFAULT CURRENT_TIMESTAMP
            )
        `);

        // Tabla de votos.
        await connection.query(`
            CREATE TABLE IF NOT EXISTS entryVotes (
                id CHAR(36) PRIMARY KEY NOT NULL,
                value TINYINT UNSIGNED NOT NULL,
                userId CHAR(36) NOT NULL,
                entryId CHAR(36) NOT NULL,
                createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
                FOREIGN KEY (userId) REFERENCES users(id),
                FOREIGN KEY (entryId) REFERENCES entries(id)
            )
        `);

        console.log('¡Tables created!');
    } catch (err) {
        console.error(err);
    } finally {
        // Si existe una conexión la liberamos.
        if (connection) connection.release();

        // Cerramos el proceso.
        process.exit();
    }
};

// Ejecutamos la función anterior.
main();
