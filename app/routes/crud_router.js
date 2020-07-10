const express = require('express');
const router = express.Router({mergeParams: true});
const _ = require('lodash');
const {localQuery} = require('../../local_query');
const getIncludeParams = (query) => {
  if(Array.isArray(query)){
    return query
  }
  if(typeof(query) === 'string'){
    return [query]
  }
  let only = {};
  if(query.only){
    query.only = Array.isArray(query.only) ? query.only : [query.only]
    only = query.only.reduce((hash, name) => {
      hash[name] = 1
      return hash
    }, {})
  }
  except = {};
  if(query.except){
    query.except = Array.isArray(query.except) ? query.except : [query.except]
    except = query.except.reduce((hash, name) => {
      hash[name] = 0
      return hash
    }, {})
  }
  return _.merge(only, except);
}

const buildQueryParams = (params) => {

}

router.get('/', localQuery, (request, response, next) => {
  const resourceClass = response.locals.resourceClass;
  const query = {}
  if(request.params.term){
    query.name = new RegExp(request.params.term, 'i');
  }
  let result = resourceClass.find(query);
  if(request.params.include){
    let include = request.params.include;
    Object.keys(include).forEach((key) => {
      includeParams = getIncludeParams(include[key])
      result = result.populate(key, includeParams);
    })
  }
  if(request.params.select){
    result = result.select(request.params.select.join(' '))
  }
  if(request.params.except){
    result = result.select(request.params.except.map(k => `-${k}`).join(' '))
  }
  const limit = +request.params.limit;
  const skip = +request.params.skip;
  if(limit > 0){
    result.limit(limit);
  }
  if(skip){
    result.skip(skip);
  }
  result.exec((error, entries) =>{
    response.header('Access-Control-Allow-Origin', '*');
    response.header('Access-Control-Allow-Credentials', true);
    response.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    response.header('Access-Control-Allow-Methods: GET, POST, PATCH, PUT, DELETE, OPTIONS');
    if(error){
      response.status(422).json(error);
    }else{
      response.status(200).json(entries);
    }
  })
})

router.post('/', localQuery, (request, response, next) => {
  const resourceClass = response.locals.resourceClass;
  const resourceName = response.locals.resourceName;
  resourceClass.create(request.params[resourceName], (error, hero) => {
    if(error){
      response.status(422).json(error);
    }else{
      response.json(hero);
    }
  })
})

router.get('/:id', localQuery, (request, response, next) => {
  const resourceClass = response.locals.resourceClass;
  let result = resourceClass.findById(request.params.id);
  if(request.params.include){
    let include = request.params.include;
    Object.keys(include).forEach((key) => {
      includeParams = getIncludeParams(include[key])
      result = result.populate(key, includeParams);
    })
  }
  result.exec((error, hero) => {
    response.header('Access-Control-Allow-Origin', '*');
    response.header('Access-Control-Allow-Credentials', true);
    response.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    response.header('Access-Control-Allow-Methods: GET, POST, PATCH, PUT, DELETE, OPTIONS');
    if(error){
      response.status(422).json(error)
    }
    response.json(hero)
  });
})

router.put('/:id', localQuery, (request, response, next) => {
  const resourceClass = response.locals.resourceClass;
  const resourceName = response.locals.resourceName;
  resourceClass.findOneAndUpdate({_id: request.params.id}, request.params[resourceName], (error, hero) => {
    if(error) {
      response.status(422).json(error);
    } else {
      response.json(hero);
    }
  })
})

router.delete('/:id', (request, response, next) => {
  const resourceClass = response.locals.resourceClass;
  resourceClass.findOneAndDelete({_id: request.params.id}, (error, hero) => {
    if(error){
      response.status(422).json(error);
    }else{
      response.json(hero);
    }
  })
})

module.exports = router;
