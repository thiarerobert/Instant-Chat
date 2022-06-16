
//Récupération de toutes les classes du bouton like
let likePoste = document.querySelectorAll('.boutonLike');
let dislikePoste = document.querySelectorAll('.boutonDislike');

//Fonction pour envoyer le like ajouté au serveur
export const AddLike = async (event) => {
    let data = {
        id_post: event.target.dataset.id
    };
    
    let response = await fetch('/', {
        method: 'PATCH',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(data)
    }); 

    if(response.ok){
        window.location.reload('/');
    }
}

//Boucle pour parcourir le tableau de classe de toutes les likes
for(let like of likePoste) {
    like.addEventListener('click', AddLike);
}

//Fonction pour demander au serveur de supprimer le like précédemment ajouté
export const DeleteLike = async (event) => {
    console.log('allo');
    let data = {
        id_post: event.target.dataset.id
    };
    let response = await fetch('/', {
        method: 'PUT',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(data)
    }); 

    if(response.ok){
        window.location.reload('/');
    }
}

for(let disLike of dislikePoste) {
    //Boucle pour parcourir le tableau de classe de toutes les dislikes
    disLike.addEventListener('click', DeleteLike);
}
