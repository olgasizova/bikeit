const pg = require('pg-promise');

const config = {
  host:      process.env.DB_HOST,
  port:      process.env.DB_PORT,
  database:  process.env.DB_DATABASE,
  user:      process.env.DB_USER,
  password:  process.env.DB_PASSWORD,

};

const db = pg(config);

module.exports = {

// person model
//initial sign in request
 getPersonByEmail(req, res, next){

    let filter = '';
    if(req.params.id){
      filter = " where email = '" + req.params.email + "'";
    }

    db.query('SELECT * FROM person' + filter)
      .then((arrRecords) => {
        res.returnRecords = arrRecords;
        next();
      })
      .catch(error => next(error));
      return false;
  },

  getPersonById(req, res, next){

    let filter = '';
    if(req.params.id){
      filter = ' where id = ' + req.params.id;
    }

    db.query('SELECT * FROM person' + filter)
      .then((arrRecords) => {
        res.returnRecords = arrRecords;
        next();
      })
      .catch(error => next(error));
      return false;
  },

//update person fields
  // email VARCHAR(50),
  // pwd VARCHAR(10),
  // lname VARCHAR(50),
  // fname VARCHAR(50),
  // imgurl TEXT

  updatePerson(req, res, next) {
    let filter = " where id = " + req.params.id;

    let updSql = "UPDATE person SET email = '" + req.params.email + "', "
    updSql += "pwd = '" + req.params.pwd + "', ";
    updSql += "lname = '" + req.params.lname + "', ";
    updSql += "fname = '" + req.params.fname + "', ";
    updSql += "imgurl = '" + req.params.imgurl + "' ";
    updSql += filter;

    db.query(updSql)
    .then((arrRecords) => {
      res.returnRecords = arrRecords;
      next();
    })
    .catch(error => next));
    return false;
  },

  deletePerson(req, res, next) {

    let filter = " where id = " + req.params.id;
    let notes = req.params.notes;

    db.query("DELETE FROM person" + filter)
    .then((arrRecords) => {
      res.returnRecords = arrRecords;
      next();
    })
    .catch(error => next(error));
    return false;
  },

  insertPerson(req, res, next) {

    let fields = " (email, pwd, lname, fname, imgurl) ";
    let values = " ('" + req.params.email
                 + "', '" + req.params.pwd
                 + "', '" + req.params.lname
                 + "', '" + req.params.fname
                 + "', '" + req.params.imgurl
                 + "') "

    db.query("INSERT INTO person" + fields + "VALUES" + values)
      .then((arrRecords) => {
        res.returnRecords = arrRecords;
        next();
      })
      .catch(error => next(error));
      return false;

  },






// team model

getTeam(req, res, next){

    let filter = '';
    if(req.params.id){
      filter = 'where id =' + req.params.id;
    }

    db.query('SELECT * FROM bikeit' + filter)
      .then((arrRecords) => {
        res.returnRecords = arrRecords;
        next();
      })
      .catch(error => next(error));
      return false;
  },

  updateTeam(req, res, next) {
    let filter = "where id = " + req.params.id;
    let notes = req.params.notes;

    db.query("UPDATE bikeit SET notes = '" + notes + "'" + filter)
    .then((arrRecords) => {
      res.returnRecords = arrRecords;
      next();
    })
    .catch(error => next));
    return false;
  },

  deleteTeam(req, res, next) {

    let filter = " where id = " + req.params.id;
    let notes = req.params.notes;

    db.query("DELETE FROM bikeit" + filter)
    .then((arrRecords) => {
      res.returnRecords = arrRecords;
      next();
    })
    .catch(error => next(error));
    return false;
  },

  insertTeam(req, res, next) {

    let fields = " (trip_id, person_id)";
    let values = " ('" + req.params.trip_id
                 + "', '" + req.params.person_id
                 + "')"

    db.query("INSERT INTO bikeit" + fields + "VALUES" + values)
      .then((arrRecords) => {
        res.returnRecords = arrRecords;
        next();
      })
      .catch(error => next(error));
      return false;

  }
};


