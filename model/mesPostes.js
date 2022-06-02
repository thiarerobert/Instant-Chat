import connectionPromise from "./connection.js"

/*Fonction qui retourne tous les name, text, timestamp et nombre 
**de likes contenu dans la base de données
*/ 
export const getPostes = async () =>{
    let connection = await connectionPromise;
    let resultat = await connection.all(
        `SELECT u.name, p.text, p.timestamp, count(l.id_post) AS nbLikes
        FROM posts p
        INNER JOIN users u ON u.id_user = p.id_user
        LEFT JOIN likes l ON l.id_post = p.id_post
        GROUP BY p.id_post
        ORDER BY p.timestamp DESC
        `
    ); 
        return resultat;
}

//Fonction pour ajouter une publication dans la base de données.
export const addPoste = async (id_post ,id_user, text, timestamp) => {
    let connection = await connectionPromise;
    let resultat = await connection.run(
        `
            INSERT INTO posts (id_user, text, timestamp) 
            VALUES(?, ?, ?)
        `,
            [id_post ,id_user, text, timestamp]
    )

    return resultat.id_post;
}