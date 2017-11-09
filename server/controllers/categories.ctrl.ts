import * as express from 'express';
import * as procedures from '../procedures/categories.proc';

let router = express.Router();

router.route('/')
    .get((req, res) => {
        procedures.getCategories()
            .then(function(categories) {
                res.send(categories);
            }, function(err) {
                res.status(500).send(err);
            });
    })
    .post((req, res) => {
        procedures.createCategory(req.body.categoryName)
            .then(function(id: any) {
                res.status(201).send(id);
            }, function(err) {
                res.status(500).send(err);
            });
    });

export default router;