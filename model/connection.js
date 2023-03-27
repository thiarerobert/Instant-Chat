///importation de la librairie sqlite pour l'utilisation de la base de données
import mysql from 'promise-mysql';

// Base de données dans un fichier
let connectionPromise = mysql.createPool({
    database: process.env.MY_DB,
    host: process.env.host,
    user: process.env.USER,
    password: process.env.password
});

// Si le fichier de base de données n'existe pas, on crée la base de données
// et on y insère des données fictive de test.
    connectionPromise.then(async (connection) => {

             await connection.query (
                `CREATE TABLE IF NOT EXISTS user_types(
                    id_user_type INTEGER PRIMARY KEY auto_increment,
                    type TEXT NOT NULL,
                    statut INTEGER
                    );
                `)

                await connection.query (
                `
                CREATE TABLE IF NOT EXISTS users(
                    id_user INTEGER PRIMARY KEY auto_increment,
                    id_user_type INTEGER NOT NULL,
                    email TEXT NOT NULL UNIQUE,
                    password TEXT NOT NULL,
                    name TEXT NOT NULL,
                    CONSTRAINT fk_user_type 
                        FOREIGN KEY (id_user_type)
                        REFERENCES user_types(id_user_type) 
                       
                    );
               `)

               await connection.query (`
               CREATE TABLE IF NOT EXISTS posts(
                id_post INTEGER PRIMARY KEY auto_increment,
                id_user INTEGER,
                text TEXT NOT NULL,
                timestamp INTEGER NOT NULL,
                CONSTRAINT fk_post_user 
                    FOREIGN KEY (id_user)
                    REFERENCES users(id_user) 
                    
                    );
                    
               `)

               await connection.query(`
               CREATE TABLE IF NOT EXISTS likes(
                id_post INTEGER,
                id_user INTEGER,
                CONSTRAINT fk_like_post 
                    FOREIGN KEY (id_post) 
                    REFERENCES posts(id_post),
                CONSTRAINT fk_like_user 
                    FOREIGN KEY (id_user) 
                    REFERENCES users(id_user) 
                    );
               `)
               await connection.query(`
               CREATE TABLE IF NOT EXISTS suivis(
                id_user INTEGER,
                id_user_suivi INTEGER
                );
               `)
                
                
            return connection;
    })

export default connectionPromise;