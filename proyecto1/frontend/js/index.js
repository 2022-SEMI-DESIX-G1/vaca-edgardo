(() => {
    const App = {
      config: {
        apiBaseUrl: "http://localhost:3000/pokemon",
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
            const renderTemplates = App.templates.LocationInfo({data});
            App.htmlElements.output.innerHTML = renderTemplates;
          }
          else if(App.htmlElements.evolutionChecked.checked) {
            const renderTemplates = App.templates.evolutionInfo({data});
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
              <div class="contents">
                <img src="${spriteValue}" width='100px' height='100px'>
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
          return `<h1>Location Checked</h1>`;
        },
        evolutionInfo: (data) => {
          return `<h1>Evolution Checked</h1>`;
        }
      },
      utils: {
        getUrl: ({ pokemon }) => {
          return `${App.config.apiBaseUrl}/${pokemon}`;
        },
      },
    };
    App.init();
  })();