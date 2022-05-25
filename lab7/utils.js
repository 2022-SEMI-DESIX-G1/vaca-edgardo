const link = require('./url.json');
const axios = require("axios").default

const getFormattedBackendUrl = ({ name, searchType }) => {
    console.log(`${link.pokeApi}/${searchType}/${name}`);
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
    const searchType = "pokemon"
    console.log(name);
    return fetch({
      url: getFormattedBackendUrl({ name, searchType }),
      searchType,
    });
  };
  
  const getEvolution = (url)=>{
    return fetch({url, searchType: ''})
  };

  module.exports = {
    getPokemon,
    getEvolution,
    fetch,
    getFormattedBackendUrl
}