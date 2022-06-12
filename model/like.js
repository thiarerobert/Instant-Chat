import connectionPromise from "./connection.js";

export const likePost = async (id_post, id_user) => {
    let connection = await connectionPromise;
    let resultat = await connection.run(
        `
            INSERT INTO likes (id_post, id_user)
            VALUES (?, ?)
        `,
        [id_post, id_user]
    );

    return resultat;
}