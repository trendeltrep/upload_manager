require('dotenv').config();
const express = require('express');
const path = require('path');
var cors = require('cors')
const app = express();
app.use(cors());

const backendPort = 3000;
const frontendPort = 3001;

app.use(function(req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', `http://localhost:${backendPort}`);
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
});

var logger = require('morgan');
app.use(logger('dev'));
app.use(express.static(path.join(__dirname, 'public')));

app.listen(frontendPort, () => {
    console.log(`Frontend started on http://localhost:${frontendPort}`);
});