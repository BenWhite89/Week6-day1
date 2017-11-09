import * as express from 'express';
import * as procedures from '../procedures/posts.proc';

let router = express.Router();

router.route('/')
    .get((req, res) => {
        procedures.getPosts()
            .then(function(posts) {
                res.send(posts);
            }, function(err) {
                res.status(500).send(err);
            });
    })
    .post((req, res) => {
        procedures.createPost(req.body.userId, req.body.categoryId, req.body.title, req.body.content)
            .then(function(id: any) {
                res.status(201).send(id);
            }, function(err) {
                res.status(500).send(err);
            });
    });

router.route('/:id')
    .get((req, res) => {
        procedures.getPost(req.params.id)
            .then(function(post: any) {
                res.send(post);
            }, function(err) {
                res.status(500).send(err);
            });
    })
    .patch((req, res) => {
        procedures.updatePost(req.params.id, req.body.categoryId, req.body.title, req.body.content)
            .then(function(posts) {
                res.status(204);
            }, function(err) {
                res.status(500).send(err);
            });
    })
    .delete((req, res) => {
        procedures.deletePost(req.params.id)
            .then(function(id) {
                res.status(204);
            }, function(err) {
                res.status(500).send(err);
            });
    });

export default router;

