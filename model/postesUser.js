import connectionPromise from "./connection.js";

/*Fonction pour recupérer le name, text, timestamp
et le nombre de likes du nom de l'utilisateur entré*/
export const getPostUser = async (id_user) => {
    let connexion = await connectionPromise;
    let resultat = await connexion.all(
        `
            SELECT u.name, p.text, datetime (p.timestamp, 'unixepoch') as datetime, COUNT(l.id_post) AS nbLikes
            FROM posts p
            INNER JOIN users u ON p.id_user = u.id_user 
            LEFT JOIN likes l ON l.id_post = p.id_post
            WHERE u.id_user = ?
            GROUP BY p.id_post
            ORDER BY p.timestamp DESC
           
        `,
        [id_user]
    );

    return resultat;
}