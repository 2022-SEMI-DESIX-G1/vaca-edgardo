//import * as yappy from "yappy-js-sdk";
//yappy.setButton(false, "#Yappy_Checkout_Button","brand");
((Utils) => {
    const App = {
      htmlElements: {
        
        YappyForm: document.querySelector("#address-form"),
        btnSubmit: document.querySelector("#btnSubmit"),
        Yappy_Checkout_Button: document.querySelector("#Yappy_Checkout_Button"),
        yappyCheckbox: document.querySelector("#yappy"),
        moneyCheckbox: document.querySelector("#money"),
        bankCheckbox: document.querySelector("#bank"),
        subtotal: document.querySelector(".subtotal"),
        itbms: document.querySelector(".itbms"),
        total: document.querySelector(".total"),
        
      },
      init: () => {
        App.htmlElements.yappyCheckbox.addEventListener(
          "click",
          App.handlers.yappyFormOnSubmit
        );
      },
      handlers: {
        yappyFormOnSubmit: async (e) => {
          e.preventDefault();
          
          App.htmlElements.Yappy_Checkout_Button.style.display = "block";
          
          const response = await Utils.getYappy();
        
          try {
                  if (response) {  
                    const renderedTemplate = App.templates.render({response,});
                    App.htmlElements.Yappy_Checkout_Button.innerHTML = renderedTemplate;
                  } else {
                    const renderedTemplateError = App.templates.errorCard();
                    App.htmlElements.Yappy_Checkout_Button.innerHTML = renderedTemplateError;
                  }
          } catch (error) {
            const renderedTemplateError = App.templates.errorCard();
            App.htmlElements.Yappy_Checkout_Button.innerHTML = renderedTemplateError;
          }
        },
        clearForm: (e) => {
          e.preventDefault();
          App.htmlElements.Yappy_Checkout_Button.style.display = "none";
          const renderedTemplateBlank = App.templates.blankCard();
          App.htmlElements.Yappy_Checkout_Button.innerHTML = renderedTemplateBlank;
        },
      },
      templates: {
        render: ({response }) => {
          const renderMap = App.templates.yappyCard
          return renderMap
            ? renderMap(response)
            : App.templates.errorCard();
        },
        errorCard: () => `<div class="container">
                          <div class="contents">
                                <p>
                                  <h1>
                                    RECHAZADO.
                                  </h1>
                                </p>
                          </div>
                        </div>`,
        blankCard: () => ``,
        yappyCard: ({success, url}) => {
  
          console.log(url);
          console.log(success);
          let container_buttons = "";
          let color = "blue";
          let title = "Pagar";
          if (success === true){
            container_buttons = `<div class="button-yappy">
                                    <a href="${url}" id="link-yappy">${title} con<span class="yappy-logo ${color}">Yappy</span>
                                      <button class="ecommerce yappy ${color}" id="bg-payment">${title} con Yappy</button>
                                    </a>
                                      
                                </div>`;
          } else {
            container_buttons = "";
          }
          return `${container_buttons}`;
        },
      },
    };
    App.init();
  })(document.Utils);