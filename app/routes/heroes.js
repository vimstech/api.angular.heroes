const express = require('express');
const router = express.Router();

const { Hero } = require('../models/hero');

const localQuery = require('../../local_query').localQuery;

router.get('/', localQuery, (request, response, next) => {
  Hero.findAll({
    include: ['abilities'],
    attributes: [['id', '_id'], 'name', 'created_at', 'updated_at']
  }).then((heroes) => {
    response.json(heroes.map(hero => hero.toJSON()));
  })
})

router.post('/', localQuery, (request, response, next) => {
  Hero.create({name: request.params.name}).then((h) => {
    Hero.findByPk(h.get('id'), {
      include: ['abilities'],
      attributes: [['id', '_id'], 'name', 'created_at', 'updated_at']
    }).then(hero => {
      response.json(hero.toJSON());
    })
  })
})

router.get('/:id', localQuery, (request, response, next) => {
  hero = Hero.findByPk(request.params.id, {
    include: ['abilities'],
    attributes: [['id', '_id'], 'name', 'created_at', 'updated_at']
  }).then(hero => {
    response.json(hero.toJSON());
  });
});

router.put('/:id', localQuery, (request, response, next) => {
  hero = Hero.findByPk(request.params.id).then(hero => {
    hero.update({name: request.params.name}).then(hero => {
      response.json(hero.toJSON());
    });
  });
});

router.delete('/:id', (request, response, next) => {
  Hero.findByPk(request.params.id).then(hero => {
    hero.destroy().then(() => {
      response.json(hero.toJSON());
    });
  });
})

module.exports = router;