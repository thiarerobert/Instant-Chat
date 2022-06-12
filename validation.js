
//Fonction de validation côté serveur de l'Input saisi par l'utilisateur
/**
 * 
 * @param {String} textPoste 
 * @returns 
 */
export const textPosteValidation = (textPoste) => {
   return typeof textPoste === 'string' && !!textPoste;
}

//Fonction de validation côté serveur du input recherche de l'utilisateur.
/**
 * 
 * @param {String} texte 
 * @returns 
 */
export const searchValidation = (texte) => {
    return typeof texte === 'string' && !!texte;
 }

export const IdValidation = (idUser) => {
   return typeof idUser === 'number' && !!idUser
 }

 export const validationNom = (name) => {
   return typeof name === 'string' && !!name;
}

export const validationEmail = (email) => {
    return email.match(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/);
 }

export const validationPassword = (password) => {
   return password.length >= 8 && typeof password === 'string' && !!password;
}


     
    
