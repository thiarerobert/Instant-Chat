import bcrypt from 'bcrypt';
import passport from 'passport';
import { Strategy } from 'passport-local';
import { getNewUser } from './model/compte.js';

const config = {
    usernameField: 'email',
    passportField: 'password'
};


passport.use(new Strategy(config, async (email, password, done) => {
    try {
        let user = await getNewUser(email);
        
        if(!user) {
            return done(null, false, { error: 'wrong_email'});
        }

        const valid = await bcrypt.compare(password, user[0].password);
        
        if(!valid) {
            return done(null, false, { error: 'wrong_password'});
        }
        
        return done(null, user);
    }
    catch(error) {
        return done(error);
    }
    
}));

//Sauvegarder la=e email dans la BD session
passport.serializeUser((user, done) => {
    done(null, user[0].email)
});

passport.deserializeUser (async (email, done) => {
    try {
        let user = await getNewUser(email);
        done(null, user);
    }
    catch(error) {
        return done(error);
    }
})