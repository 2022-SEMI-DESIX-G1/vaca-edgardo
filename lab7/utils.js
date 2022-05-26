const link = require('./url.json');
const axios = require("axios").default

const getFormattedBackendUrl = ({ name, searchType }) => {
    return `${link.pokeApi}/${searchType}/${name}`;
};

const fetch = async ({ url, searchType }) => {
    try {
        const rawResponse = await axios(url);
        if (rawResponse.status !== 200) {
            throw new Error(`${searchType} not found`);
        }
        return rawResponse.data
    } catch (error) {
        throw error;
    }
};
const getPokemon = async ({ name }) => {
    const searchType = "pokemon";
    return fetch({
      url: getFormattedBackendUrl({ name, searchType }),
      searchType,
    });
  };
  
  const getEvolution = async (url) => {
    return await axios.get(url);
  };

  module.exports = {
    getFormattedBackendUrl,
    fetch,
    getPokemon,
    getEvolution
}