import * as express from 'express';
import posts from './controllers/posts.ctrl';
import users from './controllers/users.ctrl';
import categories from './controllers/categories.ctrl';

let router = express();

router.use('/posts', posts);
router.use('/users', users);
router.use('/categories', categories);

export default router;


