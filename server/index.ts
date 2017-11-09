import * as express from 'express';
import * as bodyParser from 'body-parser';
import * as path from 'path';
import * as cookieParser from 'cookie-parser';
import check from './middleware/assetcheck.mw';
import api from './api';
import configurePassport from './config/passport';

let app = express();

let clientPath = path.join(__dirname, '../client');

app.use(express.static(clientPath));
app.use(bodyParser.json());
app.use(cookieParser());

configurePassport(app);

app.get('*', check);
app.use('/api', api);


app.listen(3000);