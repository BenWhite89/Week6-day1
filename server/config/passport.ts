import * as express from 'express';
import * as passport from 'passport';
import * as session from 'express-session';
let MySQLStore = require('express-mysql-session')(session);
import { Strategy  as LocalStrategy } from 'passport-local';
import * as userProc from '../procedures/users.proc';
import { pool } from './db';
import { models } from '../Models/models.d';

export default function configurePassport(app: express.Express) {
    passport.use(new LocalStrategy({
        usernameField: 'email',
        passwordField: 'password'
    }, (email, password, done) => {
        userProc.getUserByEmail(email).then((user) => {
            console.log(typeof(user.password));
            console.log(typeof(password));
            if (!user) {
                console.log('1');
                return done(null, false);
            }
            if (user.password.toString() !== password.toString()) {
                console.log('2');
                return done(null, false, {message: 'Nope!'});
            }
            console.log('3');
            return done(null, user);
        }, (err) => { 
            console.log(err);
            return done(err); 
        });
    }));

    passport.serializeUser((user: models.IUser, done) => {
        console.log(user);
        done(null, user.id);
    });

    passport.deserializeUser((id: number, done) => {
        console.log(id);
        userProc.getUser(id).then((user) => {
            console.log(user);
            done(null, user);
        }, (err) => {
            console.log(err);
            done(err);
        });
    });

    let sessionStore = new MySQLStore({
        createDatabaseTable: true
    }, pool);

    app.use(session({
        secret: 'random string!',
        store: sessionStore,
        resave: false,
        saveUninitialized: false
    }));

    app.use(passport.initialize());
    app.use(passport.session());
}