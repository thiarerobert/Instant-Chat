import connectionPromise from "./connection.js";
import bcrypt from 'bcrypt';

export const addNewUser = async ( email, password, name) => {
    let connection = await connectionPromise;
    let passwordH = await bcrypt.hash(password, 10);

    let resultat = await connection.run(
        `
            INSERT INTO users (id_user_type, email, password, name)
            VALUES (1, ?, ?, ?)
        `,
        [email, passwordH, name]
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