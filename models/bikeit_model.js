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

  getPerson(req, res, next){

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

  updatePerson(req, res, next) {
    let filter = "where id = " + req.params.id;
    let notes = req.params.notes;

    db.query("UPDATE person SET notes = '" + notes + "'" + filter)
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

    db.query("DELETE FROM bikeit" + filter)
    .then((arrRecords) => {
      res.returnRecords = arrRecords;
      next();
    })
    .catch(error => next(error));
    return false;
  },

  insertPerson(req, res, next) {

    let fields = " (email, pwd, lname, fname, imgurl)";
    let values = " ('" + req.params.email
                 + "', '" + req.params.pwd
                 + "', '" + req.params.lname
                 + "', '" + req.params.fname
                 + "', '" + req.params.imgurl
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


