//Récupération de l'ID des boutons
let inputFollow = document.getElementById('followUser');
let inputUnFollow = document.getElementById('unFollowUser');

//Fonction pour suivre un utilisateur
inputFollow.addEventListener('click', async (event) => {

    let data = {
        id_user: event.target.dataset.id
    }

    await fetch('/publications/:id_user', {
        method: 'PATCH',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(data)
    });
});


//Fonction pour ne plus suivre un utilisateur
inputUnFollow.addEventListener('click', async (event) => {

    let data = {
        id_user: event.target.dataset.id
    }

    await fetch('/publications/:id_user', {
        method: 'DELETE',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(data)
    });
});