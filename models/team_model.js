// team model
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

getTeamMembers(req, res, next){
    let reqRecord = getReqRecord(req);

    let filter = '';
    if(reqRecord.trip_id){
      filter = ' where trip_id =' + reqRecord.trip_id;
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
    let reqRecord = getReqRecord(req);

    let filter = " where person_id = " + reqRecord.person_id;


    db.query("DELETE FROM team" + filter)
    .then((arrRecords) => {
      res.returnRecords = arrRecords;
      next();
    })
    .catch(error => next(error));
    return false;
  },

  joinTeam(req, res, next) {
    let reqRecord = getReqRecord(req);

    let fields = " (trip_id, person_id) ";
    let values = " ('" + reqRecord.trip_id
                 + "', '" + reqRecord.person_id
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
