const express = require('express');
const router = express.Router({mergeParams: true});
const localQuery = require('../../local_query').localQuery;

const { Ability } = require('../models/ability');
const { Hero } = require('../models/hero');

router.get('/', localQuery, (request, response, next) => {
  Ability.findAll({}).then(abilities => {
    response.json(abilities.map(ability => ability.toJSON()));
  })
})

router.post('/', localQuery, (request, response, next) => {
  Hero.findByPk(request.params.hero_id).then(hero => {
    Ability.create({
      name: request.params.name,
      hero_id: hero.get('id')
    }).then(ability => {
      response.json(ability.toJSON());
    });
  });
});

router.get('/:id', localQuery, (request, response, next) => {
  Ability.findByPk(request.params.id).then(ability => {
    response.json(ability.toJSON());
  });
});

router.put('/:id', localQuery, (request, response, next) => {
  Ability.findByPk(request.params.id).then(ability => {
    ability.update({name: request.params.name}).then(ability => {
      response.json(ability.toJSON());
    });
  });
});

router.delete('/:id', (request, response, next) => {
  Ability.findByPk(request.params.id).then(ability => {
    ability.destroy().then(() => {
      response.json({msg: 'ability deleted successfully.'});
    });
  });
});

module.exports = router;
