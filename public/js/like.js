
let formLike = document.getElementById('formLike');

formLike.addEventListener('submit', async (event) => {
    let data = {
        id_post: event.target.dataset.id
    };

    fetch('/', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(data)
    }); 
})