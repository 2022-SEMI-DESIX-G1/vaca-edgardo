(() => {
    const App = {
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
        sprites: ``,
        encounters: ``,
        evolutions: ``,
        generals: ``,
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

          const query = App.htmlElements.input.value.toLowerCase();
          
          try {
            const data = await App.utils.getPokemon({
              query,
            });
            
            App.htmlElements.generals = App.templates.general(data.infoPokemon);
            
            if (App.htmlElements.spritesChecked.checked) {
              App.htmlElements.sprites = App.templates.sprites(data.infoPokemon);
            } else {
              App.htmlElements.sprites = ``;
            }

            if(App.htmlElements.locationChecked.checked) {
              App.htmlElements.encounters = App.templates.encounters(data.infoPokemon);
            }
            else {
              App.htmlElements.encounters = ``;
            }

            if(App.htmlElements.evolutionChecked.checked) {
              App.htmlElements.evolutions = App.templates.evolutions(data.infoPokemon);
            }
            else {
              App.htmlElements.evolutions = ``;
          }
          App.htmlElements.output.innerHTML = App.htmlElements.generals + App.htmlElements.sprites + App.htmlElements.evolutions + App.htmlElements.encounters;
        } catch (error) {
          console.log(error);
          App.htmlElements.output.innerHTML = `<div id="error"><h1 class="error-search">Invalid Pokemon</h1><div>`;
        }
      },
    },
    templates: {
      general: ({ id, name, weight, height, abilities, date }) => {
        abilities = abilities.map(
          (element) =>
            `<li>${element.ability.name} ${
              element.is_hidden ? App.htmlElements.hidden : ""
            }</li>`
            );
            return `
            <div class="pokemon-card">
            <h1>${name[0].toUpperCase()}${name.substring(1)} (${id})</h1>
            <p class="content-two"><b>Weight / Height:</b> <br> ${weight} / ${height}</p>
            <br>
            <div class="ability-info">     
              <p class="content">Abilities</p>             
              <ul class="no-bold-titles space">${abilities.join("")}</ul><br>
              <p class="content">Time: ${date}</p>
            </div>
            </div>
            `;
        },
        encounters: ({ encounters }) => {
          const store = [];
          encounters.map((component) => {
            store.push(`<br><h4>${component.location_area.name}</h4><hr>`);
            component.version_details.map((detail) => {
              store.push(
                `<strong><i><h4>&nbsp&nbsp&nbsp&nbsp&nbsp ${detail.version.name[0].toUpperCase()}${detail.version.name.substring(1)}</h4></i></strong>`
              );
              detail.encounter_details.map((detail) => {
                store.push(
                  `<li class="content-two margin-apart">&nbsp&nbsp&nbsp&nbsp&nbsp${detail.method.name} (${detail.chance})</li>`
                );
              });
            });
          });
  
          return `
                <div class="pokemon-card">
                <h1>Encounters</h1>
                <div>
                ${store.join("")}
                </div>
                </div>
          `;
        },
        sprites: ({ sprites }) => {
          const sprite = Object.keys(sprites[0]);
          const arraySprite = [];
          sprite.map((component, i) => {
            if (sprites[0][component] != null && i < 8) {
              arraySprite.push(
                `<img src="${sprites[0][component]}"/>`
              );
            }
          });
          return `
          <div class="sprites pokemon-card">
          <h1>Sprites</h1>
              <div>${arraySprite.join("")}</div>
          </div>`;
        },
        evolutions: ({ evolesArray }) => {
          evolution = evolesArray.map(
            (component) =>
              `<li class="content-two margin-apart">${component.species.name} ${
                component.is_baby ? App.htmlElements.baby : ""}</li> `
          );
          return ` <div class="pokemon-card">
                        <h1>Evolution Chain</h1>
                        <ul>${evolution.join("")}</ul>
                    </div>`;
        },
      },
        utils: {
          settings: {
            backendBaseUrl: "http://localhost:3000/api/pokemon",
            options:  {
              method: 'POST',
              headers: {
              'Content-Type': 'application/json',
              },
            }
          },
          getFormattedBackendUrl: ({ query }) => {
            return `${App.utils.settings.backendBaseUrl}/${query}`;
          },
          getPokemon: ({ query }) => {
            return App.utils.fetch({
              url: App.utils.getFormattedBackendUrl({ query })
            });
          },
          getEvolution:  (url)=>{
            return App.utils.fetch({url})
          },
          fetch: async ({ url }) => {
            //console.log(url);
            try {
              const rawResponse = await fetch(url, App.utils.settings.options);
              //console.log(rawResponse)
              if (rawResponse.status !== 200) {   
                throw new Error(`${url} not found`);
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