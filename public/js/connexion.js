
let connexionCompte = document.getElementById('formConnexion');
let inputEmail = document.getElementById('textEmail');
let inputPassword = document.getElementById('textPassword');

connexionCompte.addEventListener('submit', async (event) => {
    event.preventDefault();

    let data = {
        email: inputEmail.value,
        password: inputPassword.value
    }

    let response = await fetch('/login', {
        method: 'POST',
        headers: { 'Content-Type' : 'application/json' },
        body: JSON.stringify(data)
    });

    if(response.ok) {
        window.location.replace('/');
    }
})