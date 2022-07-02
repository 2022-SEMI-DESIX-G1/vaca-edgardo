const { Schema, model } = require("mongoose");

const pokemonSchema = Schema({
  date: {
    type: String
  },
  height: {
    type: String,
    required: true,
  },
  id: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  
  weight: {
    type: String,
    required: true,
  },
  abilities: [],
  encounters: [],
  encounterArray: [],
  evolesArray: [],
  sprites: [],
});

pokemonSchema.method("toJSON", function () {
  const { __v, _id, ...object } = this.toObject();
  return object;
});

module.exports = model("Pokemon", pokemonSchema);