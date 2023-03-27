import connectionPromise from "./connection.js";
import bcrypt from 'bcrypt';

//Fonction pour ajouter un nouvel utilisateur dans la BD
export const addNewUser = async ( name, email, password) => {
    let connection = await connectionPromise;
    let passwordH = await bcrypt.hash(password, 10);
    let resultat = await connection.query(
        `
            INSERT INTO users (id_user_type, name, email, password)
            VALUES (1, ?, ?, ?)
        `,
        [name, email, passwordH]
    );
    
    return resultat.lastID;
}

//Fonction pour connecter un utilisateur.
export const getNewUser = async (email) => {
    let connection = await connectionPromise;
    let resultat = await connection.query(
        `SELECT u.id_user, u.id_user_type, u.email, u.password, t.statut
         FROM users u
         INNER JOIN user_types t ON u.id_user_type = t.id_user_type
         WHERE email = ?
        `,
        [email]
    )

    return resultat;
}