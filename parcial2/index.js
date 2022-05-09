((Utils) => {
    const App = {
      htmlElements: {
        pokemonFinderForm: document.querySelector("#pokemon-finder-form"),
        pokemonFinderSearchType: document.querySelector(
          "#pokemon-finder-search-type"
        ),
        pokemonFinderInput: document.querySelector("#pokemon-finder-query"),
        pokemonFinderOutput: document.querySelector("#pokemon-finder-response"),
      },
      init: () => {
        App.htmlElements.pokemonFinderForm.addEventListener(
          "submit",
          App.handlers.pokemonFinderFormOnSubmit
        );
      },
      handlers: {
        pokemonFinderFormOnSubmit: async (e) => {
          e.preventDefault();
  
          const query = App.htmlElements.pokemonFinderInput.value;
          const searchType = App.htmlElements.pokemonFinderSearchType.value;
          console.log({ searchType });
          try {
            const response = await Utils.getPokemon({
              query,
              searchType,
            });
            const renderedTemplate = App.templates.render({
              searchType,
              response,
            });
            App.htmlElements.pokemonFinderOutput.innerHTML = renderedTemplate;
          } catch (error) {
            App.htmlElements.pokemonFinderOutput.innerHTML = `<h1>${error}</h1>`;
          }
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
        errorCard: () => `<h1>There was an error</h1>`,
        pokemonCard: ({ id, name, weight, height }) => {
          return `<h1>${name} (${id})</h1><ul><li>Weight: ${weight}</li><li>Height: ${height}</li></ul>`;
        },
        abilityCard: ({ id, name, pokemon }) => {
          const pokemonList = pokemon.map(
            ({ pokemon, is_hidden }) =>
              `<li><a target="_blank" href="${pokemon.url}">${pokemon.name}${
                is_hidden ? " (Hidden)" : ""
              }</a></li>`
          );
          return `<h1>${name} (${id})</h1><ul>${pokemonList.join("")}</ul>`;
        },
      },
    };
    App.init();
  })(document.Utils);