(() => {
    const App = {
      config: {
        apiBaseUrl: "http://localhost:3000/pokemon",
        apiEvolutionUrl: "http://localhost:3000",
      },
      htmlElements: {
        form: document.querySelector(".pokemon-form"),
        input: document.querySelector("#pokemon-input"),
        output: document.querySelector("#pokemon-finder-response"),
        response: document.querySelector(".pokemon-card"),
        hidden: "<img src='assets/svg/hidden.svg'></img>'", // Imágen svg del ojito
        baby: "<img src='assets/svg/baby.svg'></img>'", // Imagen svg del bebe
        spritesChecked: document.querySelector('#sprites'),
        locationChecked: document.querySelector('#location'),
        evolutionChecked: document.querySelector('#evolution'),
        evolutionsOfPokemons: [],
        locationOfPokemons: [],
      },
      init: () => {
        App.htmlElements.form.addEventListener(
          "submit",
          App.handlers.handleFormSubmit
        );
      },
      handlers: {
        handleFormSubmit: async (e) => {
          e.preventDefault();
          try {
            const pokemon = App.htmlElements.input.value;
          const url = App.utils.getUrl({ pokemon });
          const { data } = await axios.post(url);
          console.log({ data });

          if (App.htmlElements.spritesChecked.checked) {
            const renderTemplates = App.templates.spritesInfo({data});
            App.htmlElements.output.innerHTML = renderTemplates;
          } 
          else if(App.htmlElements.locationChecked.checked) {
            const responseLocation = await App.utils.getLocation({pokemon,});
            App.htmlElements.locationOfPokemons = responseLocation;

            const renderTemplates = App.templates.LocationInfo({data});
            App.htmlElements.output.innerHTML = renderTemplates;
          }
          else if(App.htmlElements.evolutionChecked.checked) {
            const responseEvolution = await App.utils.getEvolution({pokemon,});
            App.htmlElements.evolutionsOfPokemons = responseEvolution;
            
            const renderTemplates = App.templates.evolutionInfo({responseEvolution});
            App.htmlElements.output.innerHTML = renderTemplates;
          }
          else {
            const renderTemplates = App.templates.generalInfo({data});
            App.htmlElements.output.innerHTML = renderTemplates;
          }
        } catch (error) {
          App.htmlElements.output.innerHTML = `<div id="error"><h1 class="error-search">Invalid Pokemon</h1><div>`;
        }
      },
    },
    templates: {
        generalInfo: ({data, abilities = data.data.abilities}) => {
            abilities = abilities.map((component) =>
            `<li>${component.ability.name[0].toUpperCase()}${component.ability.name.substring(1)} ${
                component.is_hidden ? App.htmlElements.hidden : "" }</li>` );
            return `
            <div class="pokemon-card">
            <h1>${data.data.name[0].toUpperCase()}${data.data.name.substring(1)} (${data.data.id})</h1>
            <p class="content-two"><b>Weight / Height:</b> <br> ${data.data.weight} / ${data.data.height}</p>
            <br>
            <div class="ability-info">     
              <p class="content">Abilities</p>             
              <ul class="no-bold-titles space">${abilities.join("")}</ul>
            </div>
            </div>
            `;
        },
        spritesInfo: ({data, sprites = data.data.sprites}) =>{
          var spriteContent = '';
          for(var i = 0; i < Object.keys(sprites).length - 2; i++){
            var spriteName = Object.keys(sprites)[i];
            var spriteValue = sprites[spriteName];
            if(spriteValue) {
              spriteContent += `
              <div class="sprite-info">
                  <div class="sprite">
                    <img src="${spriteValue}" class="sprite-default">
                  </div>
              </div>`;
            }
          }
          return `
          <div class="pokemon-card">
            <h2 class="center">Sprites</h2>
            ${spriteContent}
          </div>`;          
        },
        LocationInfo: ({data}) => {
          const locationPokemon = App.htmlElements.locationOfPokemons.data;
          
          locationList = locationPokemon.map((component) => {
            return `<p class="content-three">${component.name}</p>
                    <p class="content-three">${component.chance}</p>
                    <p class="content-three">${component.method}</p>
                    <p class="content-three">${component.version}</p><br>`;   
          });
          return `
          <div class="pokemon-card">
            <h1>Location</h1>
            ${locationList.join("")}
          </div>`
        },
        evolutionInfo: ({responseEvolution}) => {
          const evolutionPokemon = App.htmlElements.evolutionsOfPokemons.data;
          console.log(evolutionPokemon);
          evolutionList = evolutionPokemon.map((component) => {
            return `<li class="content-two margin-apart">${component.name}</li>`; });
          
          return `
          <div class="pokemon-card">
            <h1>Evolution Chain</h1>
            <ul>${evolutionList.join("")}</ul>
          </div>`
        }
      },
      utils: {
        getUrl: ({ pokemon }) => {
          return `${App.config.apiBaseUrl}/${pokemon}`;
        },
        getFormattedBackendUrl: ({ pokemon, searchType }) => {
          return `${App.config.apiEvolutionUrl}/${searchType}/${pokemon}`;
        },
        getEvolution: ({pokemon}) => {
          const searchType = "evolution";
          return App.utils.fetch({
            url: App.utils.getFormattedBackendUrl({ pokemon, searchType }),
            searchType,
          });
        },
        getLocation: ({pokemon}) => {
          const searchType = "encounters";
          return App.utils.fetch({
            url: App.utils.getFormattedBackendUrl({ pokemon, searchType }),
            searchType,
          });
        },
        fetch: async ({ url, searchType }) => {
          try {
            const rawResponse = await fetch(url);
            if (rawResponse.status !== 200) {
              throw new Error(`${searchType} not found`);
            }
            return rawResponse.json();
          } catch (error) {
            throw error;
          }
        },
      },
    };
    App.init();
  })();