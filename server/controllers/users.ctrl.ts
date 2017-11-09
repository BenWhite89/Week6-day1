import * as express from 'express';
import * as procedures from '../procedures/users.proc';
import * as auth from '../middleware/auth.mw';
import * as passport from 'passport';
import { models } from '../Models/models.d';

let router = express.Router();

router.route('/login')
    .get((req: any, res) => {
        req.session.destroy(() => {
            req.logOut();
            res.sendStatus(204);
        });
    })
    .post((req, res, next) => {
        passport.authenticate('local', (err: any, user: models.IUser, info: any) => {
            console.log(user);
            if(err) {
                console.log(err);
                res.sendStatus(500);
            }
            if (!user) {
                return res.status(401).send(info);
            }
            req.logIn(user, (err) => {
                if (err) {
                    return res.sendStatus(500);
                } else {
                    res.send(user);
                }
            });
        }) (req, res, next);
    });

router.route('/')
    .get((req, res) => {
        procedures.getUsers()
            .then(function(users) {
                res.send(users);
            }, function(err) {
                res.status(500).send(err);
            });
    })
    .post((req, res) => {
        procedures.createUser(req.body.firstName, req.body.lastName, req.body.email, req.body.password)
            .then(function(id) {
                res.status(201).send(id);
            }, function(err) {
                res.status(500).send(err);
            });
    });

router.get('*', auth.isLoggedIn);

router.route('/me')
    .get((req, res) => {
        res.send(req.user);
    });

router.route('/:id')
    .get((req, res) => {
        console.log(req.body);
        procedures.getUser(req.params.id)
            .then(function(user) {
                res.send(user);
            }, function(err) {
                res.status(500).send(err);
            })
    })
    .patch((req, res) => {
        procedures.updateUser(req.params.id, req.body.firstName, req.body.lastName, req.body.email)
            .then(function(id) {
                res.sendStatus(204);
            }, function(err) {
                console.log(err);
                res.sendStatus(500);
            })
    })
    .delete((req: any, res) => {
        procedures.deleteUser(req.params.id)
            .then(function(id) {
                req.session.destroy(() => {
                    req.logOut();
                    res.sendStatus(204);
                })
                res.sendStatus(204);
            }, function(err) {
                console.log(err);
                res.sendStatus(500);
            })
    })


export default router;