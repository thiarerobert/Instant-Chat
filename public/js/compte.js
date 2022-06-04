let compte = document.getElementById('compte');
let textNom = document.getElementById('textNom');
let textEmail = document.getElementById('textEmail');
let textPassword = document.getElementById('textPassword');

export const addMessageClient = () => {
    let div = document.createElement('div');
    compte.appendChild(div);
}

/**
 * 
 * @param {Event} event 
 */
export const getNewUser = async (event) => {
    event.preventDefault();
    console.log('allo');
    let data= {
        textNom: textNom.value,
        textEmail: textEmail.value,
        textPassword: textPassword.value
    }

    let response = await fetch('/signup', {
       method: 'POST',
       headers: {'Content-Type': 'application/json'},
       body: JSON.stringify(data) 
    });
    
    if(response.ok){
        addMessageClient({
            textNom: textNom.value,
        textEmail: textEmail.value,
        textPassword: textPassword.value
        });
       
    }
} 

compte.addEventListener('submit', getNewUser);