
let like = document.getElementById('boutonLike');

like.addEventListener('click', async (event) => {
    let data = {
        id_post: event.target.dataset.id
    };

    await fetch('/', {
        method: 'PATCH',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(data)
    }); 
})