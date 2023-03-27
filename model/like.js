import connectionPromise from "./connection.js";

//Fonction pour ajouter des likes dans la BD
export const likePost = async (id_post, id_user) => {

    let connection = await connectionPromise;
    let resultat = await connection.query(
        `
            INSERT INTO likes (id_post, id_user)
            VALUES (?, ?)
        `,
        [id_post, id_user]
    );

    return resultat;
}

export const Deletelike = async (id_post, id_user) => {

    let connection = await connectionPromise;
    let resultat = await connection.query(
        `
            DELETE
            FROM likes
            WHERE id_post = ? AND id_user = ?
        `,
        [id_post, id_user]
    );

    return resultat;
}