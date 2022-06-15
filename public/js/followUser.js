let inputFollow = document.getElementById('followUser');

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