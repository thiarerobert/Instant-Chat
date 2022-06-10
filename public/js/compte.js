
let compte = document.getElementById('compte');
let inputNom = document.getElementById('textNom');
let inputEmail = document.getElementById('textEmail');
let inputPassword = document.getElementById('textPassword');

compte.addEventListener('submit', async (event) => {
    event.preventDefault();

    let data = {
        name: inputNom.value,
        email: inputEmail.value,
        password: inputPassword.value
    }

    let response = await fetch('/compte', {
        method: 'POST',
        headers: { 'Content-Type' : 'application/json' },
        body: JSON.stringify(data)
    });

    if(response.ok) {
        window.location.replace('/login');
    }
})