'use strict'
const Router = require('express').Router();
const person = require('../models/person_model');
const trip = require('../models/trip_model');



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

// to process the sign-up page
Router.route('/signup')
// insert new person and return him or her back by using getPersonById
  .post(person.addPerson, person.getPersonById, sendJSONresp);

//add trip
Router.route('/addtrip')

  .post(trip.addTrip, trip.getTrips, sendJSONresp);


module.exports = Router;
