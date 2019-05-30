const express = require('express');
const router = express.Router();

const localQuery = require('../../local_query').localQuery;

router.get('/', localQuery, (request, response, next) => {
  response.json(request.params)
})

router.post('/', localQuery, (request, response, next) => {
  response.json(request.params)
})

router.get('/:id', localQuery, (request, response, next) => {
  response.json(request.params)
})

router.put('/:id', localQuery, (request, response, next) => {
  response.json(request.params)
})

router.delete('/:id', (request, response, next) => {
  response.json(request.params)
})

module.exports = router;
