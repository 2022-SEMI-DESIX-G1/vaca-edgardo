const utils = require("./utils");
(async () => {
    const pokemonName = "Pikachu"

    try {

        const { id, name, weight,
            height, abilities,
            evolutionChain } = await utils.getPokemon({ name: pokemonName.toLowerCase() });

        console.log({
            id,
            name,
            weight,
            height,
            abilities: abilities.map((component) => {
                return  `${component.ability.name[0].toUpperCase()}${component.ability.name.substring(1)}`
            }), 
            
            /*evolutionChain: evolutionChain.map((pokemon) => {
                return { name: utils.capitalize(pokemon.name), isBaby: pokemon.isBaby ? "is baby" : "not" }
            })*/
        })

    } catch (e) {
        console.log(e)
    }
})()
