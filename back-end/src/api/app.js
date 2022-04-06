const express = require('express');

const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');
const http = require('http').createServer(app);

const io = require('socket.io')(http, {
  cors: {
    origin: 'http://localhost:3000',
    methods: ['POST', 'GET'],
  },
});

const routers = require('../database/routers');
const error = require('../database/middlewares/error');

app.use(cors());
app.use(bodyParser.json());
app.use('/images', express.static(path.join(__dirname, '../../', 'public/images')));

app.get('/coffee', (_req, res) => res.status(418).end());

app.use(routers);
app.use(error);

require('./sokets/status')(io);

module.exports = http;
