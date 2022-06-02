
//récupération des données HTML
let formulaire = document.getElementById('formulaire');
let textPoste = document.getElementById('textPoste');
let textPosteErreur = document.getElementById('textPosteErreur');
let date = new Date();

//Fonction pour générer un model de publication avec les données 
const addPosteClient = (poste) =>{
    let li = document.createElement('li');
    let div = document.createElement('div');
    div.innerText = poste.textPoste;
    li.appendChild(div);
    publication.appendChild(li); 
}

//Fonction pour valider du côté serveur l'entrée d'un utilisateur 
const posteValidation = () => {
    if( textPoste.validity.valid ) {
        textPoste.classList.remove('error');
        textPosteErreur.classList.remove('active');
    }
    else{
        textPoste.classList.add('error');
        textPosteErreur.classList.add('active');
        if(textPoste.validity.valueMissing) {
            textPosteErreur.innerText = 'Votre publication est vide, veuillez y mettre du texte.';
        }
    }
}
//Appel de la fonction validation de l'entrée au click
formulaire.addEventListener('submit', posteValidation);

/**
 *  Fonction pour ajouter une publication dans le serveur
 * @param {Event} event 
 */
const addPosteServeur = async (event) => {
    event.preventDefault();

    //Condition pour vérifier si les données saisies sont valides
    if(formulaire.checkValidity()){
        let data = {
            id_user: 1,
            text : textPoste.value
        }
        // Envoie des données au serveur si c'est valide
        let response = await fetch('/', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(data)
        });

        //Condition pour envoyer les données au client si c'est valide
        if(response.ok){
            addPosteClient({
                id_user: 1,
                text: textPoste.value
            });

            textPoste.value = '';
        }
    }
}

//Appel de la fonction pour envoyer les données au serveur au click
formulaire.addEventListener('submit', addPosteServeur);
