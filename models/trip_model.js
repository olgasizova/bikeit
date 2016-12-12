// trip model

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

  getTrips(req, res, next){

    let filter = '';
    if(req.params.id){
      filter = ' where trip.id =' + req.params.id;
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

// clean up update trip
  updateTrip(req, res, next) {
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

  deleteTrip(req, res, next) {

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

  insertTrip(req, res, next) {

    let fields = " (leader_id, country, city, start_addr, end_addr, meet_date, meet_time) ";
    let values = " (" + req.params.leader_id
                 + ", '" + req.params.country
                 + "', '" + req.params.city
                 + "', '" + req.params.start_addr
                 + "', '" + req.params.end_addr
                 + "', '" + req.params.meet_date
                 + "', '" + req.params.meet_time
                 + "') "

    db.query("INSERT INTO trip" + fields + "VALUES" + values)
      .then((arrRecords) => {
        res.returnRecords = arrRecords;
        next();
      })
      .catch(error => next(error));
      return false;

  }
};
