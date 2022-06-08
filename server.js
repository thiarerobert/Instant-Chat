// Aller chercher les configurations de l'application
import 'dotenv/config';

// Importer les fichiers et librairies
import express, { json, urlencoded } from 'express';
import expressHandlebars from 'express-handlebars';
import helmet from 'helmet';
import compression from 'compression';
import cors from 'cors';
import cspOption from './csp-options.js';
import session from 'express-session';
import passport from 'passport';
import './model/connection.js';
import { addPoste, getPostes} from './model/mesPostes.js';
import { getUser } from './model/recherche.js';
import { getPostUser } from './model/postesUser.js';
import { textPosteValidation, searchValidation, validateEmail, validatePassword } from './validation.js';
import { addNewUser } from './model/compte.js';
import memorystore from 'memorystore';
import { request } from 'express';
import { response } from 'express';
import './auth.js';



// Création du serveur
const app = express();
app.engine('handlebars', expressHandlebars());
app.set('view engine', 'handlebars');
const MemoryStore = memorystore(session);


// Ajout de middlewares
app.use(helmet(cspOption));
app.use(compression());
app.use(cors());
app.use(json());
app.use(urlencoded({ extended: false }));
app.use(express.static('public'));
app.use(session ({
    cookie: {maxAge: 3600000 },
    name: process.env.npm_package_name,
    store: new MemoryStore({ checkPeriod: 3600000 }),
    resave: false,
    saveUninitialized: false,
    secret: process.env.SESSION_SECRET
}));
app.use(passport.initialize());
app.use(passport.session());
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

// Route pour afficher la page d'inscription.
app.get('/compte', (request, response) => {
    response.render('compte', {
        title: 'Sign-Up',
        styles: ['/css/compte.css'],
        scripts: ['/js/compte.js']
    });
});

//Route pour inscrire un utilisateur dans la BD
app.post('/compte', async (request, response, next) => {
    
  //  if(validateEmail(request.body.email) && validatePassword( request.body.password)){
        try {
            await addNewUser(
                request.body.email,
                request.body.password,
                request.body.name
            );
            response.status(201).end();
        }

        catch (error){
            if(error.code === 'SQLITE_CONSTRAINT'){
                response.status(409).end();
            }
            else {
                next(error);
            }
        }
        
    }
  /*   else {
        response.status(400).end();
     }
    
}*/);

//Route pour connecter un utilisateur
app.get ('/login', (request, response) => {
    response.render('connexion', {
        title: 'login',
        styles: ['/css/connexion.css']
    });
});

//Route pour envoyer les données de connexion d'un utilisateur
app.post('/login', (request, response, next) => {
   // if(validateEmail(request.body.email) && validatePassword( request.body.password)){
        passport.authenticate('local', (error, user, info) => {
            if(error) {
                next(error);
            }
            else if(!user){
                response.status(401).json(info);
            }
            else {
                request.logIn (user, (error) => {
                    if(error) {
                        next(error);
                    }
                    response.status(200).end();
                });
            }
        })
        (request, response, next);
    }
//}
);

//Route pour déconnecter un utilisateur
app.post('/logout', (request, response) => {
    request.logout((error) => {
        if(error) {
            next(error);
        }
    });
    response.redirect('/');
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
