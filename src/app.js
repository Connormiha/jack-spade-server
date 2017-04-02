// @flow

import express from 'express';
import bodyParser from 'body-parser';
const app = express();

import apiGameCreate from 'api/game/create';
import apiGameDelete from 'api/game/delete';

import apiUserCreate from 'api/game/create';
import apiUserDelete from 'api/game/delete';

// const crypto = require('crypto');

// console.log(crypto.createHash('md5').update('foo').digest('hex'));

app.use(bodyParser.json());
app.disable('x-powered-by');

app.post('/api/game/create', apiGameCreate);
app.post('/api/game/delete', apiGameDelete);

app.post('/api/user/create', apiUserCreate);
app.post('/api/user/delete', apiUserDelete);

app.listen(3000);
