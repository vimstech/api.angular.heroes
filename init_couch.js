var async = require('async');  
var couchdb = require('./couchdb');

var databases = ['heroes', 'abilities'];

module.exports = initCouch;

function initCouch(cb) {  
  createDatabases(cb);
}
function createDatabases(cb) {  
  async.each(databases, createDatabase, cb);
}
function createDatabase(db, cb) {  
  couchdb.db.create(db, function(err) {
    if (err && err.statusCode == 412) {
      err = null;
    }
    cb(err);
  });
}
