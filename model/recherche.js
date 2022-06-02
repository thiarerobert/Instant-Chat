import connectionPromise from "./connection.js";

//Fonction qui retourne le nom de l'utilisateur entré.
export const getUser = async (name) => {
    let connexion = await connectionPromise;
    let resultat = await connexion.get(
        `
        SELECT * 
         FROM users
         WHERE name = ?
        `,
        [name]
    );

    return resultat;
}

/*Fonction qui retourne tous les utlisateurs qui existe dans la 
base de données utilisée pour une recherche intélligente d'un utilisateur*/
export const getUserName = async (searchName) => {
    let connexion = await connectionPromise;
    let resultat2 = await connexion.all(
        `
            SELECT name
            FROM users
        `
    );
    return resultat2;
}