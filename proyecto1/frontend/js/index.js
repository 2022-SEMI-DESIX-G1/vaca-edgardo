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
        },
      },
      templates: {
        generalInfo: ({data, abilities = data.data.abilities}) => {
            abilities = abilities.map((component) =>
            `<li>${component.ability.name[0].toUpperCase()}${component.ability.name.substring(1)} ${
                component.is_hidden ? App.htmlElements.hidden : "" }</li>` );
            return `
            <h1>${data.data.name[0].toUpperCase()}${data.data.name.substring(1)} (${data.data.id})</h1>
            <p>Weight / Height: <br> ${data.data.weight} / ${data.data.height}</p>

            <div class="ability-info">     
              <p class="content">Abilities</p>             
              <ul class="no-bold-titles space">${abilities.join("")}</ul>
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
              <div>
                <img src="${spriteValue}">
              </div>`;
            }
          }
          return `
          <div class="container">
            <h2>Sprites</h2>
            ${spriteContent}
          </div>`;          
        },
        LocationInfo: ({data}) => {
          const locationPokemon = App.htmlElements.locationOfPokemons.data;
          
          locationList = locationPokemon.map((component) => {
            return `<p>${component.name}</p>
                    <p>${component.chance}</p>
                    <p>${component.method}</p>
                    <p>${component.version}</p><br>`;   
          });
          return `
          <h1>Location</h1>
          ${locationList.join("")}`
        },
        evolutionInfo: ({responseEvolution}) => {
          const evolutionPokemon = App.htmlElements.evolutionsOfPokemons.data;
          console.log(evolutionPokemon);
          evolutionList = evolutionPokemon.map((component) => {
            return `<li>${component.name}</li>`; });
          
          return `
          <h1>Evolution</h1>
          <div>
            <ul>${evolutionList.join("")}</ul>
          </div>
          `
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