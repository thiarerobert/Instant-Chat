let compte = document.getElementById('compte');
let inputNom = document.getElementById('textNom');
let inputEmail = document.getElementById('textEmail');
let inputPassword = document.getElementById('textPassword');

/**
 * 
 * @param {Event} event 
 */
export const getNewUser = async (event) => {
    event.preventDefault();

    let data = {
        nom: inputNom.value,
        email: inputEmail.value,
        password: inputPassword.value
    }

    let response = await fetch ('/compte', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    });

    if(response.ok) {
        window.location.replace('/login');
    }
}

compte.addEventListener('submit', getNewUser);