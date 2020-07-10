const express = require('express');
const router = express.Router({mergeParams: true});
const {Hero} = require('../models/hero');

const crudRouter = require('./crud_router');

router.use('/',(request, response, next)=>{
  console.log('set resource class for every request')
  response.locals.resourceClass = Hero;
  response.locals.resourceName = 'hero';
  next()
}, crudRouter);

module.exports = router;