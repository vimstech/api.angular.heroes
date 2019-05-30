var extend = require('lodash/extend');

module.exports.localQuery = (request,response,next) =>{
  request.params = extend({}, request.query, request.body, request.params);
  response.locals.request = request;
  response.locals.auth_token = request.params['auth_token'];
  next();
};
