// @flow

import express from 'express';
import bodyParser from 'body-parser';
const app = express();

import apiGameCreate from 'api/game/create';

// const crypto = require('crypto');

// console.log(crypto.createHash('md5').update('foo').digest('hex'));

app.use(bodyParser.json());
app.disable('x-powered-by');

app.post('/api/game/create', apiGameCreate);

app.listen(3000);
