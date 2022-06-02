
//Fonction de validation côté serveur de l'Input saisi par l'utilisateur
export const textPosteValidation = (textPoste) => {
   return typeof textPoste === 'string' && !!textPoste;
}

//Fonction de validation côté serveur du input recherche de l'utilisateur.
export const searchValidation = (texte) => {
    return typeof texte === 'string' && !!texte;
 }
     
    
