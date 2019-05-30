const express = require('express');
const router = express.Router();
const Ability = require('../models/ability').Ability;

const localQuery = require('../../local_query').localQuery;

router.get('/', localQuery, (request, response, next) => {
  const query = {}
  if(request.params.term){
    query.name = new RegExp(request.params.term, 'i');
  }
  const abilities = Ability.find(query);
  const limit = request.params.limit;
  if(limit > 0){
    abilities.limit(+limit);
  }
  abilities.populate('hero', {name: 1, power: 1}).exec((error, abilities) =>{
    if(error){
      response.statusCode = 422;
      response.json(error)
    }else{
      response.json(abilities);
    }
  })
})

router.post('/', localQuery, (request, response, next) => {
  Ability.create({name: request.params.name }, (error, abilities) => {
    if(error){
      response.statusCode = 422
      response.json(error);
    }else{
      response.json(abilities);
    }
  })
})

router.get('/:id', localQuery, (request, response, next) => {
  Ability.findById(request.params.id).populate('abilities', ['name', 'power']).exec((error, abilities) => {
    if(error){
      response.statusCode = 422
      response.statusMessage = `Unable to find abilities with id=${request.params.id}`
      response.json(error)
    }
    response.json(abilities)
  });
})

router.put('/:id', localQuery, (request, response, next) => {
  Ability.findOneAndUpdate({_id: request.params.id}, {name: request.params.name}, (error, abilities) => {
    if(error) {
      response.statusCode = 422;
      response.json(error);
    } else {
      response.json(abilities);
    }
  })
})

router.delete('/:id', (request, response, next) => {
  Ability.findOneAndDelete({_id: request.params.id}, (error, abilities) => {
    if(error){
      response.statusCode = 422;
      response.statusMessage = `Unable to delete abilities with id=${request.params.id}`;
      response.json(error);
    }else{
      response.json(abilities);
    }
  })
})

module.exports = router;