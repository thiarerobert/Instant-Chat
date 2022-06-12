import connectionPromise from "./connection.js";
import bcrypt from 'bcrypt';

export const addNewUser = async ( name, email, password) => {
    let connection = await connectionPromise;
    let passwordH = await bcrypt.hash(password, 10);

    let resultat = await connection.run(
        `
            INSERT INTO users (id_user_type, name, email, password)
            VALUES (1, ?, ?, ?)
        `,
        [name, email, passwordH]
    );

    return resultat.lastID;
}

export const getNewUser = async (email) => {
    let connection = await connectionPromise;
    let resultat = await connection.get(
        `SELECT id_user, id_user_type, email, password
         FROM users
         WHERE email = ?
        `,
        [email]
    )

    return resultat;
}