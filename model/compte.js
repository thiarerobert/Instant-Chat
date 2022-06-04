import connectionPromise from "./connection.js";

export const addNewUser = async (id_user, email, password, name) => {
    let connection = await connectionPromise;
    let resultat = await connection.run(
        `
            INSERT INTO users (id_user, id_user_type, email, password, name)
            VALUES (?, 1, ?, ?, ?)
        `,
        [id_user, email, password, name]
    )
    return resultat.id_user;
}