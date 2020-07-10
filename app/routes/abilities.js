const express = require('express');
const router = express.Router({mergeParams: true});
const crudRouter = require('./crud_router');

const {Ability} = require('../models/ability');

router.use('/',(request, response, next)=>{
  console.log('set resource class for every request')
  response.locals.resourceClass = Ability;
  response.locals.resourceName = 'ability';
  next()
}, crudRouter);

module.exports = router;