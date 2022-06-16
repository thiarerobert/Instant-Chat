//Récupération de toutes les classes des boutons delete 
let boutonDelete = document.querySelectorAll('.boutonDelete');

//Fonction pour envoyer le ID de la publication à supprimer au serveur
const deletePoste = async (event) =>{
    let data = {
        id_post: event.target.dataset.id
    }
    let response = await fetch ('/', {
        method: 'DELETE',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(data)
    });

    if(response.ok){
        window.location.reload('/');
    }
}

//Boucle for pour récupérer chaque bouton dans le tableau
for( let bouton of boutonDelete){
    bouton.addEventListener('click', deletePoste);
}
