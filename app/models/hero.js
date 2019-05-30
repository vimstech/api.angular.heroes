const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Ability = require('./ability').Ability;
const heroSchema = new Schema({
  name: {
    type: String
  },
  abilities: [
    { type: Schema.Types.ObjectId, ref: 'Ability', }
  ]
},{
  collection: 'heroes',
  id: true,
  timestamps: true,
});
const Hero = mongoose.model('Hero', heroSchema);

module.exports.Hero = Hero;
