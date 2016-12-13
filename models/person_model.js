const pg = require('pg-promise')({/*config*/});

const config = {
  host:      process.env.DB_HOST,
  port:      process.env.DB_PORT,
  database:  process.env.DB_DATABASE,
  user:      process.env.DB_USER,
  password:  process.env.DB_PASSWORD,
  ssl:       process.env.DB_SSL

};

const db = pg(config);

// W2ui framework is not restful and only makes POST to the server
// Also it wraps all form input values into "body.request" object
// credit for getReqRecord function to extract JSON from req.body goes to Vlad Chernya
const getReqRecord = function(req){
    try{
      let reqJson = JSON.parse(req.body.request);
      reqJson.record.imgurl = reqJson.imgurl;
      return reqJson.record;
    }catch(error){;
      return {};
    }
}

module.exports = {

// person model
//initial sign in request
 getPersonByEmail(req, res, next){
    let reqRecord = getReqRecord(req);
    let filter = '';

    if(reqRecord.email){
      filter = " where email = '" + reqRecord.email + "'";
    }

    db.query('SELECT * FROM person' + filter)
      .then((arrRecords) => {
        res.returnRecords = arrRecords;
        if (!arrRecords.length){
          res.returnRecords={"status": "error", "message": "Oops: not found, would you like to sign up?"};
        }

        next();
      })
      .catch(error => next(error));
      return false;
  },

  getPersonById(req, res, next){
    let reqRecord = getReqRecord(req);

    let filter = '';
    var person_id = reqRecord.id || req.person_id;
    if(person_id){
      filter = ' where id = ' + person_id;
    }

    db.query('SELECT * FROM person' + filter)
      .then((arrRecords) => {
        res.returnRecords = arrRecords;

        if (!arrRecords.length){
          res.returnRecords={"status": "error", "message": "Oops: not found, looks like a code error."};
        }

        next();
      })
      .catch(error => next(error));
      return false;
  },

// //update person fields
//   // email VARCHAR(50),
//   // pwd VARCHAR(10),
//   // lname VARCHAR(50),
//   // fname VARCHAR(50),
//   // imgurl TEXT

  updatePerson(req, res, next) {
    let reqRecord = getReqRecord(req);

    let filter = " where id = " + reqRecord.id;

    let updSql = "UPDATE person SET email = '" + reqRecord.email + "', "
    updSql += "pwd = '" + reqRecord.pwd + "', ";
    updSql += "lname = '" + reqRecord.lname + "', ";
    updSql += "fname = '" + reqRecord.fname + "', ";
    updSql += "imgurl = '" + reqRecord.imgurl + "' ";
    updSql += filter;

    db.query(updSql)
      .then((arrRecords) => {
        res.returnRecords = arrRecords;
        next();
      })
      .catch(error => next(error));
      return false;
  },

  deletePerson(req, res, next) {
    let reqRecord = getReqRecord(req);
    let filter = " where id = " + reqRecord.id;
    let notes = reqRecord.notes;

    db.query("DELETE FROM person" + filter)
    .then((arrRecords) => {
      res.returnRecords = arrRecords;
      next();
    })
    .catch(error => next(error));
    return false;
  },

  addPerson(req, res, next) {
    let reqRecord = getReqRecord(req);

    let fields = " (email, pwd, lname, fname, imgurl) ";
    let values = " ('" + reqRecord.email
                 + "', '" + reqRecord.pwd
                 + "', '" + reqRecord.lname
                 + "', '" + reqRecord.fname
                 + "', '" + reqRecord.imgurl
                 + "') "

// query inserts record and returns new record id
    db.query("INSERT INTO person" + fields + "VALUES" + values + 'RETURNING id')
      .then((arrRecords) => {
          req.person_id = arrRecords[0].id;
          res.returnRecords = arrRecords;
          next();
      })
      .catch(error => next(error));
      return false;

  }
};









