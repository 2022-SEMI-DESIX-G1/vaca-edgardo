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
          const renderTemplates = App.templates.pokemonData({data});
          App.htmlElements.output.innerHTML =renderTemplates;

        },
      },
      templates: {
        pokemonData: ({data, abilities = data.data.abilities}) => {
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