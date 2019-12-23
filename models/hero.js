var heroes = require('../couchdb').use('heroes');

exports.create = function create(hero, cb) {  
  heroes.insert(hero, hero.email, cb);
};
