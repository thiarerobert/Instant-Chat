import connectionPromise from "./connection.js";

//Fonction qui retourne le nom de l'utilisateur entré.
export const getUser = async (name) => {
    let connexion = await connectionPromise;
    let resultat = await connexion.query(
        `
        SELECT * 
         FROM users
         WHERE name LIKE ?
        `,
        ['%' + name + '%']
    );

    return resultat;
}
