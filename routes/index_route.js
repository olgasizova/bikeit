'use strict'
const Router = require('express').Router();
const person = require('../models/person_model');



const bodyParser = require('body-parser');
const path = require('path');

 // for parsing application/json
Router.use(bodyParser.json());
// for parsing application/x-www-form-urlencoded
Router.use(bodyParser.urlencoded({ extended: true }));

const sendJSONresp = (req, res) => res.json(res.returnRecords);

// to show the landing page
Router.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '/../public/html/index.html'));

});

// to process the login page
Router.route('/getuser')
// to get person by email
  .post(person.getPersonByEmail, sendJSONresp);

// to process the sign-in page
Router.route('/signin')
// to get person by email
  .post(person.addPerson, person.getPersonById, sendJSONresp);


module.exports = Router;
