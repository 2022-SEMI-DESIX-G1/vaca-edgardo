const utils = require("./utils");
const axios = require("axios").default

var link_pokeapi = axios.create({
    baseURL: 'https://pokeapi.co/api/v2/pokemon/'
  });

(async () => {
    const pokemonName = "Pikachu" 
  
    try {
        const { id, name, weight,
            height, abilities,
            evolutionChain } = result = await utils.getPokemon({ name: pokemonName.toLowerCase() });
            
            link_pokeapi.get(result.name).then(function (res) { 
                var pokemonSpecies = axios.create({
                    baseURL: res.data.species.url
                });
                
                pokemonSpecies.get().then(function (pokeResponse) { 
                    var pokeEvolution = axios.create({
                    baseURL: pokeResponse.data.evolution_chain.url
                });

                pokeEvolution.get().then(function (evolution) { 
                    let chainEvolution = [];
                    let evolutionChain  = [[evolution.data.chain.species.name]];
                    let evolutionsOfPokemons = [evolution.data.chain.evolves_to];
                    
                    while (evolutionsOfPokemons[0].length !== 0 && evolutionsOfPokemons[0] !== undefined) {
                        chainEvolution = evolutionsOfPokemons.shift();
                        
                        for (const [i] of chainEvolution.entries()) {
                            evolutionChain.push(chainEvolution[i].species.name);
                            evolutionsOfPokemons.push(chainEvolution[i].evolves_to);
                        }
                    }
                    console.log({evolutionChain});
                })
            })
        });
        console.log({
            name: result.name,
            id: result.id,
            weight: result.weight,
            height: result.height,
            abilities: abilities.map((component) => {
                return  `${component.ability.name[0].toUpperCase()}${component.ability.name.substring(1)}`
            })
        });
    } catch (e) {
        console.log(e)
    }
})()