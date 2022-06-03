// Aller chercher les configurations de l'application
import 'dotenv/config';

// Importer les fichiers et librairies
import express, { json, urlencoded } from 'express';
import expressHandlebars from 'express-handlebars';
import helmet from 'helmet';
import compression from 'compression';
import cors from 'cors';
import cspOption from './csp-options.js';
import './model/connection.js';
import { addPoste, getPostes} from './model/mesPostes.js';
import { getUser } from './model/recherche.js';
import { getPostUser } from './model/postesUser.js';
import { textPosteValidation, searchValidation } from './validation.js';
import { response } from 'express';
import { request } from 'express';



// Création du serveur
const app = express();
app.engine('handlebars', expressHandlebars());
app.set('view engine', 'handlebars');

// Ajout de middlewares
app.use(helmet(cspOption));
app.use(compression());
app.use(cors());
app.use(json());
app.use(urlencoded({ extended: false }));
app.use(express.static('public'));


// Routes GET pour accéder à toutes les publications 
app.get('/', async (request, response) =>{
    let mesPostes = await getPostes();
    response.render('postes', {
        title: 'Publication',
        postes: mesPostes,
        scripts: ['/js/main.js'],
        styles: ['/css/postes.css']
    });
    
});


//Route GET pour ajouter une publication 
app.post('/', async (request, response) => {

        if(textPosteValidation(request.body.text)){
            let idPoste = await addPoste (request.body.id_user, request.body.text);
            response.status(200).json(idPoste);
        }
        else{
            response.status(400).end();
        }
  
});

/*Reuqête GET pour afficher la page de recherche. 
**L'utilisateur peut lancer sa recheche ici.
*/
app.get ('/search', (request, response) => {
    response.render('search', {
        title: 'Recherche',
        scripts: ['/js/search.js'],
        styles: ['/css/search.css']
    });
});


//Route get pour retourner l'utilisateur rechercher dans le input Recherche.
app.get('/search/:userName', async (request, response) => {
    
    let user = await getUser(request.params.userName);
    
    //Condition pour vérifier si le nom de l'utilisateur entré existe
        if(user){
            response.render('user', {
                title: 'Recherche',
                user: user,
                scripts: ['/js/search.js'], 
                styles: ['/css/user.css']
            });
        }
        //Texte à retourner si l'utilisateur n'existe pas.
        else {
            response.status(404).send('cet utilisateur n\'existe pas');
        }   
    });


//Route get pour afficher toutes les publication d'un utilisateur.
app.get('/publications/:userID', async (request, response) => {
    
    let postUser = await getPostUser(request.params.userID);
    
    response.render('publications', {
        title: 'Publications de l\'utilisateur',
        postUser: postUser,
        styles: ['/css/publications.css']
    });
});

app.get('/signUp', (request, response) => {
    response.render('compte', {
        title: 'Sign-Up',
        styles: ['/css/compte.css']
    });
});

app.get ('/login', (request, response) => {
    response.render('connexion', {
        title: 'login',
        styles: ['/css/connexion.css']
    });
});
// Renvoyer une erreur 404 pour les routes non définies
app.use(function (request, response) {
    // Renvoyer simplement une chaîne de caractère indiquant que la page n'existe pas
    response.status(404).send(request.originalUrl + ' not found.');
});

// Démarrage du serveur
app.listen(process.env.PORT);
console.info(`Serveurs démarré:`);
console.info(`http://localhost:${ process.env.PORT }`);
