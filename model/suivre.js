import connectionPromise from "./connection.js";

//Fonction pour ajouter un follow dans dans la BD 
export const addFollower = async (id_user_suivi, id_user) =>{
    let connection = await connectionPromise;
    let resultat = await connection.run (
        `
            INSERT INTO suivis (id_user_suivi, id_user)
            VALUES (?, ?)
        `,
        [id_user_suivi, id_user]
    )

    return resultat;
}