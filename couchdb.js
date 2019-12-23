const nano = require('nano');
const couchdb = nano('http://127.0.0.1:5984');
module.exports = couchdb;
