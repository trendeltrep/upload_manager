const express = require('express');
const path = require('path');
var cors = require('cors')
const app = express();
app.use(cors());

app.use(function(req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
});

var logger = require('morgan');
app.use(logger('dev'));
app.use(express.static(path.join(__dirname, 'public')));
port = 3001
app.listen(port, () => {
    console.log(`Frontend started on http://localhost:${port}`);
});