const express = require('express');
const logger = require('morgan');
const bodyParser = require('body-parser');
require('dotenv').config();
const path = require('path');


// const routes will go here. Example:
const indexRoute = require('./routes/index_route');


const Router = require('express').Router();

const app = express();
const PORT = process.argv[2] || process.env.PORT || 3000;

// # // This tests to see if we have NODE_ENV in our environment.
// # // Only load the dotenv if we need it.
const isDev = !('NODE_ENV' in process.env)
              && require('dotenv').config()
              && true;

app.use(logger('dev'));

app.use(express.static('public'));

// app.use goes here. Example:
// app.use('/', loginRoute);
// app.use('/', signupRoute);

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json credit: http://stackoverflow.com/questions/9177049/express-js-req-body-undefined
// We are only going to accept json
app.use(bodyParser.json());
app.use('/', indexRoute);

app.listen(PORT, () => console.warn('BikeIt server is listening on ', PORT));

// generic error handler
app.use((err, req, res, next) => {
 console.log(err);
 res.status(500).send('Something Broke!');
});

module.exports = app;
