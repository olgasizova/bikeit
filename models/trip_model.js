// trip model

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

const getReqRecord = function(req){
    try{
      let reqJson = JSON.parse(req.body.request);
      return reqJson.record;
    }catch(error){; 
      return {};
    }
}

module.exports = {

  getTrips(req, res, next){
    let reqRecord = getReqRecord(req);

    let filter = '';
    let trip_id = reqRecord.id || req.trip_id;
    if(trip_id){
      filter = ' where trip.id =' + trip_id;
    }

    let qSql = "select trip.*, person.lname, person.fname, person.email, person.imgurl";
    qSql += " from trip inner join person on trip.leader_id = person.id"
    qSql += filter;


    db.query(qSql)
      .then((arrRecords) => {
        res.returnRecords = arrRecords;
        next();
      })
      .catch(error => next(error));
      return false;
  },

// clean up update
// CREATE TABLE trip(
//   id SERIAL PRIMARY KEY,
//   leader_id INT REFERENCES person(id),
//   country VARCHAR(50),
//   city VARCHAR(50),
//   start_addr TEXT,
//   end_addr TEXT,
//   meet_date DATE,
//   meet_time TIME,

//check this one

  updateTrip(req, res, next) {
    let reqRecord = getReqRecord(req);

    let filter = " where id = " + reqRecord.id;
    let updtSql = "UPDATE trip SET country = '" + reqRecord.country + "', "
    updtSql += "city = '" + reqRecord.city + "', ";
    updtSql += "start_addr = '" + reqRecord.start_addr + "', ";
    updtSql += "end_addr = '" + reqRecord.end_addr + "', ";
    updtSql += "meet_date = '" + reqRecord.meet_date + "', ";
    updtSql += "meet_time = '" + reqRecord.meet_time + "', ";
    updtSql += filter;


    db.query(updtSql)
    .then((arrRecords) => {
      res.returnRecords = arrRecords;
      next();
    })
    .catch(error => next);
    return false;
  },

  deleteTrip(req, res, next) {

    let reqRecord = getReqRecord(req);

    let filter = " where id = " + req.params.id;
    let notes = req.params.notes;

    db.query("DELETE FROM trip" + filter)
    .then((arrRecords) => {
      res.returnRecords = arrRecords;
      next();
    })
    .catch(error => next(error));
    return false;
  },

  addTrip(req, res, next) {
    let reqRecord = getReqRecord(req);

    let fields = " (leader_id, country, city, start_addr, end_addr, meet_date, meet_time) ";
    let values = " (" + reqRecord.leader_id
                 + ", '" + reqRecord.country
                 + "', '" + reqRecord.city
                 + "', '" + reqRecord.start_addr
                 + "', '" + reqRecord.end_addr
                 + "', '" + reqRecord.meet_date
                 + "', '" + reqRecord.meet_time
                 + "') "

    db.query("INSERT INTO trip" + fields + "VALUES" + values + 'RETURNING id')
      .then((arrRecords) => {
          res.trip_id = arrRecords[0].id;
          res.returnRecords = arrRecords;
          next();
      })
      .catch(error => next(error));
      return false;

  }
};
