
let compte = document.getElementById('compte');
let inputNom = document.getElementById('textNom');
let inputEmail = document.getElementById('textEmail');
let inputPassword = document.getElementById('textPassword');

let inputErrorNom = document.getElementById('textNomError');
let inputErrorEmail = document.getElementById('textEmailError');
let inputErrorPassword = document.getElementById('textPasswordError');

//Validation du input nom et prénom
const validateNom = () => {
    if(inputNom.validity.valid) {
        inputNom.classList.remove('error');
        inputErrorNom.classList.remove('active');
    }
    else {
        inputNom.classList.add('error');
        inputErrorNom.classList.add('active');

        if(inputNom.validity.valueMissing){
            inputErrorNom.innerText = 'Veuillez saisir votre nom et prénom.'
        }
    }
}

compte.addEventListener('submit', validateNom);

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

compte.addEventListener('submit', validateEmail);

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

compte.addEventListener('submit', validatePassword);

compte.addEventListener('submit', async (event) => {
    event.preventDefault();

        if(compte.checkValidity()) {
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
            else
            if(response.status === 409){
                formCompteError.style.display = 'block';
                formCompteError.style.color = '#a00';
                formCompteError.innerText = 'Un compte associé à cette adresse courriel existe déjà.'
        }
    }
})