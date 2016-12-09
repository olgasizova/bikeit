'use strict'
const Router = require('express').Router();
const bodyParser = require('body-parser');
const path = require('path');

 // for parsing application/json
Router.use(bodyParser.json());
// for parsing application/x-www-form-urlencoded
Router.use(bodyParser.urlencoded({ extended: true }));

Router.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '/../public/html/index.html'));

});

module.exports = Router;
