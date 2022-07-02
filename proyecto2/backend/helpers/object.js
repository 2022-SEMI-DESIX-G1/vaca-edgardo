getEvolutions = (evolution) => {
    const evolutions = [evolution.data.chain.evolves_to];
    let chainEvolution  = [];
    let arrayEvolves  = [];
    arrayEvolves.push(evolution.data.chain);
  
    while (evolutions[0].length !== 0 && evolutions[0] !== undefined) {
      chainEvolution = evolutions.shift();
      chainEvolution.forEach((component) => {
        if (component) {
          arrayEvolves .push(component);
          evolutions.push(component.evolves_to);
        }
      });
    }
    return arrayEvolves ;
  };
  
  getAbilities = (res) => {
    const abilities = res.abilities.map((component) => component);
    return abilities;
  };
  
  getEncounters = (res) => {
    const arrayEncounters = [];
    const detailEncounters = res.map((component) => {
      return component.version_details.map((index) => index.encounter_details.map((index1) => index1[0]));
    });
    
    try {
      arrayEncounters.map(component => {
        component.map( (elementSecond) => {
          arrayEncounters.push(elementSecond)
        })
      })
    } catch (error) {
      console.log(error);
    }
  
    return encountersDetails;
  };
  
  module.exports = {
    getEvolutions,
    getAbilities,
    getEncounters,
  };