// Aller chercher les configurations de l'application
import 'dotenv/config';

// Importer les fichiers et librairies
import https from 'https';
import { readFile } from 'fs/promises';
import express, { json, urlencoded } from 'express';
import expressHandlebars from 'express-handlebars';
import helmet from 'helmet';
import compression from 'compression';
import cors from 'cors';
import cspOption from './csp-options.js';
import session from 'express-session';
import passport from 'passport';
import './model/connection.js';
import {addPoste, getPostes} from './model/mesPostes.js';
import { addFollower, deleteFollower } from './model/suivre.js';
import {deletePoste } from './model/delete.js';
import { getUser } from './model/recherche.js';
import { getPostUser } from './model/postesUser.js';
import { textPosteValidation, searchValidation, idValidation, validationEmail, validationPassword, validationNom } from './validation.js';
import { addNewUser } from './model/compte.js';
import memorystore from 'memorystore';
//import { request } from 'express';
//import { response } from 'express';
import './auth.js';
import { Deletelike, likePost } from './model/like.js';



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
    let mesPostes = await getPostes();//request.user.id_user);
    response.render('postes', {
        title: 'Publication',
        statut: request.user?.statut,
        postes: mesPostes,
        scripts: ['/js/main.js', '/js/delete.js', '/js/like.js', '/js/search.js'],
        styles: ['/css/postes.css'],
        connected: !!request.user
    });
    
});

//Route POST pour ajouter une publication 
app.post('/', async (request, response) => {
    if(request.user){
        if(textPosteValidation(request.body.text)){
            let idPoste = await addPoste (request.user.id_user, request.body.text);
            response.status(200).json(idPoste);
        }
        else{
            response.status(400).end();
        }
    }
    else {
        response.status(401).send('Veuillez vous connecter d\'abord!')
    }   
  
});

//Route pour ajouter un like dans la BD
app.patch('/', (request, response) => {
    if(request.user){
        let likes = likePost( request.body.id_post, request.user?.id_user);
        response.status(200).json(likes);
    }
    
    else {
        response.status(401).send('Veuillez vous connecter d\'abord!')
    } 
});

/**
 * Route créé pour enlever un like dèjà ajouté dans la BD
 * Le verbe PUT est utilisé ici pour ne pas créer une confusion 
 * avec la verbe DELETE qui permet de supprimer une publication
 **/
app.put('/', (request, response) => {
    if(request.user){
        let deleteLike = Deletelike(request.body.id_post, request.user?.id_user);
        response.status(200).json(deleteLike);
    }
    else {
        response.status(401).send('Veuillez vous connecter d\'abord!')
    } 
});

//Route pour supprimer une publication.
app.delete('/', async (request, response) => {
    /*Condition pour que seul un utilisateur connecté
    et ayant un id_user_type >= 2 puis accéder à cette route*/
    if(request.user?.id_user_type >= 2){
        await deletePoste(request.body.id_post);
        response.status(200).end();
    }
    else {
        response.status(403).end();
    }
});

//Route get pour retourner l'utilisateur rechercher dans le input Recherche.
app.get('/search/:userName', async (request, response) => {
    let user = await getUser(request.params.userName);

    //Condition pour vérifier si le nom de l'utilisateur entré existe
        if(user){
            response.render('user', {
                title: 'Recherche',
                user: user,
                scripts: ['/js/search.js', '/js/followUser.js'], 
                styles: ['/css/user.css'],
                connected: !!request.user
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

    if(idValidation(request.params.userID)){
        response.render('publications', {
            title: 'Publications de l\'utilisateur',
            postUser: postUser,
            styles: ['/css/publications.css'],
            connected: !!request.user
        });
    }
    else {
        response.status(400).end();
    }
});

//Route pour suivre un utiisateur
app.patch('/publications/:id_user', async (request, response) => {
    if(request.user){
        await addFollower(request.body.id_user, request.user?.id_user);
        response.status(200).end();
    }
    else {
        response.status(401).send('Veuillez vous connecter d\'abord!')
    }
})

//Route pour ne plus suivre un utiisateur
app.delete('/publications/:id_user', async (request, response) => {
    if(request.user){
        await deleteFollower(request.body.id_user, request.user?.id_user);
        response.status(200).end();
    }
    else {
        response.status(401).send('Veuillez vous connecter d\'abord!')
    }
})
// Route pour afficher la page d'inscription.
app.get('/compte', (request, response) => {
    if(!request.user){
        response.render('compte', {
            title: 'Sign-Up',
            styles: ['/css/compte.css'],
            scripts: ['/js/compte.js'],
            connected: !!request.user
        });
    }
    else {
        response.status(401).send('Veuillez vous connecter d\'abord!')
    }
});

//Route pour inscrire un utilisateur dans la BD
app.post('/compte', async (request, response, next) => {
    //Validation les données envoyés au serveur
    if(validationNom(request.body.name) && validationEmail(request.body.email) && validationPassword(request.body.password)){
        try {
            await addNewUser(
                request.body.name,
                request.body.email,
                request.body.password
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
    else {
        response.status(400).end();
     }
        
    });

//Route pour connecter un utilisateur
app.get ('/login', (request, response) => {
    if(!request.user){
        response.render('connexion', {
            title: 'login',
            styles: ['/css/connexion.css'],
            scripts: ['/js/connexion.js'],
            connected: !!request.user
        });
    }

    else {
        response.status(401).send('Veuillez vous connecter d\'abord!')
    }
});

//Route pour envoyer les données de connexion d'un utilisateur
app.post('/login', (request, response, next) => {
    //Validation des données envoyé au serveur
    if(validationEmail(request.body.email) && validationPassword(request.body.password)){ 
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
    else {
        response.status(400).end();
     }
});

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
console.info(`Serveurs démarré:`);
if(process.env.NODE_ENV === 'production'){
    app.listen(process.env.PORT);
    console.info(`http://localhost:${ process.env.PORT }`);
}
else {
    const credentials = {
        key: await readFile('./security/localhost.key'),
        cert: await readFile('./security/localhost.cert'),
    }
    https.createServer(credentials, app).listen(process.env.PORT);
    console.info(`https://localhost:${ process.env.PORT }`);
}
module.exports = app;
