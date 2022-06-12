import connectionPromise from "./connection.js"

/*Fonction qui retourne tous les name, text, timestamp et nombre 
**de likes contenu dans la base de données
*/ 
export const getPostes = async () =>{
    let connection = await connectionPromise;
    let resultat = await connection.all(
        `SELECT u.name, p.id_post, p.id_user, p.text, datetime (p.timestamp, 'unixepoch') as datetime, count(l.id_post) AS nbLikes
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
export const addPoste = async (id_post ,id_user, text) => {
    let connection = await connectionPromise;
    let resultat = await connection.run(
        `
            INSERT INTO posts (id_user, text, timestamp) 
            VALUES(?, ?, strftime('%s', 'now'))
        `,
            [id_post ,id_user, text]
    )

    return resultat.id_post;
}

export const addFollower = async (id_user, id_user_suivi) =>{
    let connection = await connectionPromise;
    let resultat = await connection.run (
        `
            INSERT INTO suivis (id_user, id_user_suivi)
            VALUES (?, ?)
        `,
        [id_user, id_user_suivi]
    )

    return resultat;
}