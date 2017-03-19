require('app-module-path').addPath(__dirname);

const express = require('express');
const bodyParser = require('body-parser');
const app = express();

const apiGameCreate = require('api/game/create');

const crypto = require('crypto');

// console.log(crypto.createHash('md5').update('foo').digest('hex'));

app.use(bodyParser.json());
app.disable('x-powered-by');

app.post('/api/game/create', apiGameCreate);

app.listen(3000);
