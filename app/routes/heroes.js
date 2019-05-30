const express = require('express');
const router = express.Router();
const Hero = require('../models/hero').Hero;

const localQuery = require('../../local_query').localQuery;

router.get('/', localQuery, (request, response, next) => {
  const query = {}
  if(request.params.term){
    query.name = new RegExp(request.params.term, 'i');
  }
  const heroes = Hero.find(query);
  const limit = request.params.limit;
  if(limit > 0){
    heroes.limit(+limit);
  }
  heroes.populate('abilities',{name: 1, power: 1}).exec((error, heroes) =>{
    response.json(heroes);
  })
})

router.post('/', localQuery, (request, response, next) => {
  Hero.create({name: request.params.name }, (error, hero) => {
    if(error){
      response.statusCode = 422
      response.json(error);
    }else{
      response.json(hero);
    }
  })
})

router.get('/:id', localQuery, (request, response, next) => {
  Hero.findById(request.params.id).populate('abilities', ['name', 'power']).exec((error, hero) => {
    if(error){
      response.statusCode = 422
      response.statusMessage = `Unable to find hero with id=${request.params.id}`
      response.json(error)
    }
    response.json(hero)
  });
})

router.put('/:id', localQuery, (request, response, next) => {
  Hero.findOneAndUpdate({_id: request.params.id}, {name: request.params.name}, (error, hero) => {
    if(error) {
      response.statusCode = 422;
      response.json(error);
    } else {
      response.json(hero);
    }
  })
})

router.delete('/:id', (request, response, next) => {
  Hero.findOneAndDelete({_id: request.params.id}, (error, hero) => {
    if(error){
      response.statusCode = 422;
      response.statusMessage = `Unable to delete hero with id=${request.params.id}`;
      response.json(error);
    }else{
      response.json(hero);
    }
  })
})

module.exports = router;