
let connexionCompte = document.getElementById('formConnexion');
let inputEmail = document.getElementById('textEmail');
let inputPassword = document.getElementById('textPassword');

let inputErrorEmail = document.getElementById('textEmailError');
let inputErrorPassword = document.getElementById('textPasswordError');

//Validation du input email
const validateEmail = () => {
    if(inputEmail.validity.valid) {
        inputEmail.classList.remove('error');
        inputErrorEmail.classList.remove('active');
    }
    else {
        inputEmail.classList.add('error');
        inputErrorEmail.classList.add('active');

        if(inputEmail.validity.valueMissing){
            inputErrorEmail.innerText = 'Veuillez saisir votre adresse courriel.';
        }
        else 
        if (inputEmail.validity.typeMismatch){
            inputErrorEmail.innerText = 'L\'adresse courriel entrée n\'est pas valide';
        }
    }
}

connexionCompte.addEventListener('submit', validateEmail);

//Validation du input password
const validatePassword = () => {
    if(inputPassword.validity.valid) {
        inputPassword.classList.remove('error');
        inputErrorPassword.classList.remove('active');
    }
    else {
        inputPassword.classList.add('error');
        inputErrorPassword.classList.add('active');

        if(inputPassword.validity.valueMissing){
            inputErrorPassword.innerText = 'Veuillez saisir votre mot de passe.'
        }
        else
        if(inputPassword.validity.tooShort){
            inputErrorPassword.innerText = 'Veuillez saisir un mot de passe long (huit caractères).'
        }
    }
}

connexionCompte.addEventListener('submit', validatePassword);

connexionCompte.addEventListener('submit', async (event) => {
    event.preventDefault();

    if(connexionCompte.checkValidity()){
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
        else
        if(response.status === 401){
            let data = await response.json();
            formConnexionError.style.display = 'block';
            formConnexionError.style.color = '#a00';

            if(data.error === 'wrong_email'){
                formConnexionError.innerText = 'L\'adresse courriel n\'existe pas.'
            }
            else 
            if (data.error === 'wrong_password'){
                formConnexionError.innerText = 'Le mot de passe saisi est incorrect.'
                formConnexionError.style.color = '#a00';
            }
        }
    }
})