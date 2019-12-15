const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const abilitySchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  power: {
    type: Number,
    required: true,
    default: 0
  },
  hero_id: {
    type: Schema.Types.ObjectId,
    ref: 'Hero'
  }
},{
  collection: 'abilities',
  id: true
});

const Ability = mongoose.model('Ability', abilitySchema);
module.exports.Ability = Ability;