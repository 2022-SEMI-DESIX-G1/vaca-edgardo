((Utils) => {
    const App = {
      htmlElements: {
        pokemonFinderForm: document.querySelector("#pokemon-finder-form"),
        clean: document.querySelector("#clear"),
        pokemonFinderSearchType: document.querySelector(
          "#pokemon-finder-search-type"
        ),
        pokemonFinderInput: document.querySelector("#pokemon-finder-query"),
        pokemonFinderOutput: document.querySelector("#pokemon-finder-response"),
        responseCard: document.querySelector(".pokemon-card"),
        evolutionsOfPokemons: [],
        hidden: "<img src='assets/svg/hidden.svg'></img>'", // Imágen svg del ojito
        baby: "<img src='assets/svg/baby.svg'></img>'", // Imagen svg del bebe
        
        
    },
      init: () => {
        App.htmlElements.pokemonFinderForm.addEventListener(
          "submit",
          App.handlers.pokemonFinderFormOnSubmit
        );
  
        App.htmlElements.clean.addEventListener(
          "click",
          App.handlers.clearSearch
        );
      },
      handlers: {
        pokemonFinderFormOnSubmit: async (e) => {
          e.preventDefault();

          if (App.htmlElements.clean.classList.contains("hidden"))
                    App.htmlElements.clean.classList.remove("hidden");
  
          const query = App.htmlElements.pokemonFinderInput.value.toLowerCase();
          const searchType =
            App.htmlElements.pokemonFinderSearchType.value.toLowerCase();
  
          try {
            const response = await Utils.getPokemon({
              query,
              searchType,
            });
  
            if (searchType === "ability") {
              const renderedTemplate = App.templates.render({
                searchType,
                response,
              });
              App.htmlElements.pokemonFinderOutput.innerHTML = renderedTemplate;
            } else if (query == "") {
              App.htmlElements.pokemonFinderOutput.innerHTML = ``;
            } else {
              const { evolution_chain } = await Utils.getEvolution(response.species.url);
              const { chain } = await Utils.getEvolution(evolution_chain.url);
  
              let allEvolution = [chain.evolves_to];
              App.htmlElements.evolutionsOfPokemons = App.pokemonEvolution.getEvolutionResponse(allEvolution);
              App.htmlElements.evolutionsOfPokemons.unshift(chain);
  
              const renderedTemplate = App.templates.render({
                searchType,
                response,
              });
  
              App.htmlElements.pokemonFinderOutput.innerHTML = renderedTemplate;
            }
          } catch (error) {
            App.htmlElements.pokemonFinderOutput.innerHTML = `<div id="error"><h1 class="error-search">${query} no ha sido encontrado dentro de la lista de "${searchType}."</h1><div>`;
          }
        },
        clearSearch: (e) => {
          e.preventDefault();

          if (document.querySelector("#hidden"))
            document.querySelector("#hidden").style.display = "none";
          if (document.querySelector("#error"))
            document.querySelector("#error").style.display = "none";
            document.querySelector("#pokemon-finder-query").value = "";
        },
      },
      pokemonEvolution: {
        getEvolutionResponse: (evolutionsOfPokemons) => {
          var chainEvolution = [];
          var arrayEvolves = [];
  
          while (evolutionsOfPokemons[0].length !== 0 && evolutionsOfPokemons[0] !== undefined) {
            chainEvolution = evolutionsOfPokemons.shift();
            chainEvolution.forEach((component) => {
              if (component) {
                arrayEvolves.push(component);
                evolutionsOfPokemons.push(component.evolves_to);
              }
            });
          }
          return arrayEvolves;
        },
      },
      templates: {
        render: ({ searchType, response }) => {
          const renderMap = {
            ability: App.templates.abilityCard,
            pokemon: App.templates.pokemonCard,
          };
          return renderMap[searchType]
            ? renderMap[searchType](response)
            : App.templates.errorCard();
        },
        errorCard: () => `<h1>Hubo algún error. Favor contacta al administrador.</h1>`,
        pokemonCard: ({ id, name, weight, height, sprites, abilities }) => {
          const evolution = App.htmlElements.evolutionsOfPokemons;
          evolutionList = evolution.map(
            (component) => 
            `<li>${component.species.name[0].toUpperCase()}${component.species.name.substring(1)} ${
                component.is_baby ? App.htmlElements.baby : "" }</li> ` 
                );
          abilities = abilities.map(
            (component) =>
            `<li>${component.ability.name[0].toUpperCase()}${component.ability.name.substring(1)} ${
                component.is_hidden ? App.htmlElements.hidden : "" }</li>` 
                );
                // Return del card del pokemon
          return ` 
                    <div id="hidden" class="pokemon-card">
                    <h3 class="title-class">${name[0].toUpperCase()}${name.substring(1)} (${id})</h3>
                    
                      <div class="response-first">

                      <div class="sprite-info">
                          <div class="content">
                            <p>Sprites<p>
                          </div> 
                        <div class="sprite">
                            <img alt="Front default"src="${sprites.front_default}"/>
                            <img class="sprite-back-default" alt="Back default"src="${sprites.back_default}"/>
                        </div>
                      </div>

                        <div class="personal-info">
                          <p class="content">Weight / Height</p>
                          <p class="no-bold-titles">${weight} / ${height}</p>
                        </div>

                      </div>
                          
                      <div class="response-second">

                        <div>
                          <p class="content">Evolution Chain</p>
                          <ul class="no-bold-titles space">${evolutionList.join("")}</ul>
                        </div>

                        <div class="ability-info">     
                          <p class="content">Abilities</p>             
                          <ul class="no-bold-titles space">${abilities.join("")}</ul>
                        </div>

                      </div>
                    </div> 
                     `;
        },
        // Búsqueda por habilidad
        abilityCard: ({ id, name, pokemon }) => {
          const pokemonList = pokemon.map(
            ({ pokemon, is_hidden }) =>
              `<li><a target="_blank" href="">${pokemon.name}${
                is_hidden ? App.htmlElements.hidden : ""
              }</a></li>`
          );
          // Return de la búsqueda por habilidad
          return `
                <div id="hidden" class="ability-card">
                <h1 class="title-class">Battle armor </h1><h3 class="subtitle-ability">Who can learn it?</h3><ul class="subtitle-ability change-margin">${pokemonList.join("")}</ul>
                </div>
          `;
        },
      },
    };
    App.init();
  })(document.Utils);