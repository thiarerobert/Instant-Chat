
//Récupération de l'entrer de l'utilisateur.
    let texte = document.getElementById('search');

//Récupération du formulaire.
let utilisateur = document.getElementById('utilisateur');

//Récupération de l'erreur à afficher
let searchError = document.getElementById('searchError');

//fonction pour afficher un utilisateur à l'écran
const afficherUser = (user) => {
    let li = document.createElement('li');
    li.appendChild(input);
    let div = document.createElement('div');
    div.innerText = user.text;
    li.appendChild(div)
    utilisateur.appendChild(li);
}

//Fonction de validation du input rechercher du côté client
const searchValidation = () => {

    if( texte.validity.valid ) {
        texte.classList.remove('error');
        searchError.classList.remove('active');
    }

    else{
        texte.classList.add('error');
        searchError.classList.add('active');

        if(texte.validity.valueMissing) {
            searchError.innerText = 'Veuillez saisir un nom d\'utilisateur valide s\'il vous plaît.';
        }
    }
}

//Appel de la fonction de validation au click
utilisateur.addEventListener('submit', searchValidation);

/**
 *  Fonction pour envoyer le nom de l'utilisateur saisi dans l'URL
 * @param {Event} event 
 */
 const addNameServeur = async (event) => {
    event.preventDefault();
    let texteSearch = texte.value;

    //Condition pour vérifier si l'utilisateur n'a pas envoyer une chaine vide
    if(texteSearch !=''){
        window.location.replace('/search/'+ texteSearch)
    }
}

//Appel de la fonction d'envoyer de la données dans l'URL au click
utilisateur.addEventListener('submit', addNameServeur);
