const axios = require("axios");
const link = "https://pokeapi.co/api/v2/pokemon";

const getPokemonUrl = async (pokemon) => {
  const { data } = await axios.get(`${link}/${pokemon}`);
  return data;
};

const getEvolution = async (url) => {
  const response = await axios.get(url);
  return response;
};

const getEncounters = async(pokemon) => {
  const data = await axios.get(`${link}/${pokemon}/encounters`);
  return data;
}

module.exports = {
  getPokemonUrl,
  getEvolution,
  getEncounters
};
