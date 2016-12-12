// team model
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

getTeamMembers(req, res, next){

    let filter = '';
    if(req.params.trip_id){
      filter = ' where trip_id =' + req.params.trip_id;
    }

    let qSql = "SELECT team.person_id, person.lname, person.fname, person.imgurl"
              + " from team inner join person on team.person_id = person.id"
              + filter;

    db.query(qSql)
      .then((arrRecords) => {
        res.returnRecords = arrRecords;
        next();
      })
      .catch(error => next(error));
      return false;
  },



  removeFromTeam(req, res, next) {

    let filter = " where person_id = " + req.params.person_id;


    db.query("DELETE FROM team" + filter)
    .then((arrRecords) => {
      res.returnRecords = arrRecords;
      next();
    })
    .catch(error => next(error));
    return false;
  },

  joinTeam(req, res, next) {

    let fields = " (trip_id, person_id) ";
    let values = " ('" + req.params.trip_id
                 + "', '" + req.params.person_id
                 + "') "

    db.query("INSERT INTO team" + fields + "VALUES" + values)
      .then((arrRecords) => {
        res.returnRecords = arrRecords;
        next();
      })
      .catch(error => next(error));
      return false;

  }
};
