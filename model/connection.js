///importation de la librairie sqlite pour l'utilisation de la base de données
import { existsSync } from 'fs';
import sqlite3 from 'sqlite3';
import { open } from 'sqlite';

const IS_NEW = !existsSync(process.env.DB_FILE)

// Base de données dans un fichier
let connectionPromise = open({
    filename: process.env.DB_FILE,
    driver: sqlite3.Database
});

// Si le fichier de base de données n'existe pas, on crée la base de données
// et on y insère des données fictive de test.
if (IS_NEW) {
    connectionPromise = connectionPromise.then(async (connection) => {
        await connection.exec(
            `CREATE TABLE IF NOT EXISTS user_types(
                id_user_type INTEGER PRIMARY KEY,
                type TEXT NOT NULL
            );

            CREATE TABLE IF NOT EXISTS users(
                id_user INTEGER PRIMARY KEY,
                id_user_type INTEGER NOT NULL,
                email TEXT NOT NULL UNIQUE,
                password TEXT NOT NULL,
                name TEXT NOT NULL,
                CONSTRAINT fk_user_type 
                    FOREIGN KEY (id_user_type)
                    REFERENCES user_types(id_user_type) 
                    ON DELETE SET NULL 
                    ON UPDATE CASCADE
            );
            
            CREATE TABLE IF NOT EXISTS posts(
                id_post INTEGER PRIMARY KEY,
                id_user INTEGER,
                text TEXT NOT NULL,
                timestamp INTEGER NOT NULL,
                CONSTRAINT fk_post_user 
                    FOREIGN KEY (id_user)
                    REFERENCES users(id_user) 
                    ON DELETE SET NULL 
                    ON UPDATE CASCADE
            );
            
            CREATE TABLE IF NOT EXISTS likes(
                id_post INTEGER,
                id_user INTEGER,
                CONSTRAINT fk_like_post 
                    FOREIGN KEY (id_post) 
                    REFERENCES posts(id_post) 
                    ON DELETE CASCADE 
                    ON UPDATE CASCADE,
                CONSTRAINT fk_like_user 
                    FOREIGN KEY (id_user) 
                    REFERENCES users(id_user) 
                    ON DELETE SET NULL 
                    ON UPDATE CASCADE
            );

            CREATE TABLE IF NOT EXISTS suivis(
                id_user INTEGER,
                id_user_suivi INTEGER
            );
            
            INSERT INTO user_types (type) VALUES 
                ('regular'),
                ('moderator');

            INSERT INTO users (id_user_type, email, password, name) VALUES 
                (1, 'test@test.com', 'test', 'VOTRE NOM'),
                (1, 'test1@test.com', 'test', 'John Doe'),
                (1, 'test2@test.com', 'test', 'Alice Robert'),
                (1, 'test3@test.com', 'test', 'Bob Lancer'),
                (1, 'test4@test.com', 'test', 'Catherine Michael'),
                (1, 'test5@test.com', 'test', 'Dave Marshall'),
                (1, 'test6@test.com', 'test', 'Eve Trent'),
                (1, 'test7@test.com', 'test', 'Michel Tremblay');
                
            INSERT INTO posts (id_user, text, timestamp) VALUES
                (2, 'dont be sad! you''re a small leaf and its ok to want to drown in a sea of video games?', 1643492169),
                (2, 'one day more... another day another opportunity to disregard mushrooms', 1643491996),
                (2, 'i will hand down righteous judgment and smite all who be as beautiful as ham', 1646673391),
                (3, 'im just small and i dream about civilization', 1647650938),
                (4, 'im not a person. im a bunch of legos and i hate garnet', 1651378069),
                (4, 'i broke all my limbs trying to celebrate berries', 1649096245),
                (4, 'there arent enough people at my school who pretend to be a spicy meatball', 1647760622),
                (5, 'welcome to the potion store. this potion makes you dream about a realy tiny seashell', 1648601148),
                (5, 'i for one shitpost about garnet?', 1647954400),
                (5, 'what im trying to say is that i dont trust anyone who doesnt think about every single person on the earth', 1650239101),
                (5, 'do you think that houndoom the pokemon would spy on science', 1644664012),
                (6, 'we... are the crystal gems! well always save the day! and if you think we cant... we will pretend to enjoy reddit', 1646300445),
                (7, 'this is a warning: do not serenade berries?', 1649233276),
                (7, 'i think its wrong to disregard me', 1641327106),
                (8, 'im going to go back in time and pretend to be a sweater made of meat', 1646279709);
                
            INSERT INTO likes (id_post, id_user) VALUES
                (1, 2),
                (1, 4),
                (1, 5),
                (1, 8),
                (6, 1),
                (6, 2),
                (11, 2),
                (11, 7),
                (11, 8),
                (14, 7),
                (13, 6);`
        );

        return connection;
    });
}

export default connectionPromise;