'use strict'
const Router = require('express').Router();
const {getPersonByEmail} = require('../models/person_model');
const {getPersonById} = require('../models/person_model');
const {updatePerson} = require('../models/person_model');
const {deletePerson} = require('../models/person_model');
const {insertPerson} = require('../models/person_model');


const bodyParser = require('body-parser');
const path = require('path');

 // for parsing application/json
Router.use(bodyParser.json());
// for parsing application/x-www-form-urlencoded
Router.use(bodyParser.urlencoded({ extended: true }));


// to show the landing page
Router.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '/../public/html/index.html'));

});

// to show sign up page
// Router.get('/part_login', (req, res) => {
//   res.render('part_login')
// });



module.exports = Router;
