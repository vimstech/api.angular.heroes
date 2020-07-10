const mongoose    = require('mongoose');
const config      = require('../config/database');

mongoose.Promise = global.Promise;
mongoose.set('useFindAndModify', false);
mongoose.set('debug', true);
mongoose.connect(config.url, { useNewUrlParser: true, useUnifiedTopology: true }).then(() => {
  console.log("Database is connected.")
},() => {
  console.log("Cannot connect to Database.");
})
