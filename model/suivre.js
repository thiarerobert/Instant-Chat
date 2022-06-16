import connectionPromise from "./connection.js";

//Fonction pour ajouter un follower dans dans la BD 
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

//Fonction pour supprimer un follower dans dans la BD 
export const deleteFollower = async (id_user_suivi, id_user) =>{
    let connection = await connectionPromise;
        let resultat = await connection.run (
            `
                DELETE
                FROM suivis
                WHERE id_user_suivi = ? AND id_user = ?
            `,
            [id_user_suivi, id_user]
        )
    
        return resultat;
    
}