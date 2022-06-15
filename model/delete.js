import connectionPromise from "./connection.js";

//Fonction pour supprimer une publication dans la BD
export const deletePoste = async (id_post)=> {
    let connection = await connectionPromise;
    let resultat = await connection.run(
        `
            DELETE 
            FROM posts
            WHERE id_post = ?
        `,
        [id_post]
    )
    return resultat
}