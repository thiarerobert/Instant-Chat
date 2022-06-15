
let bouton = document.querySelectorAll('.boutonDelete');

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
 
for( let bout of bouton){
    bout.addEventListener('click', deletePoste);
}
