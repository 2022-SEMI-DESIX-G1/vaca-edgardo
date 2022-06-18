require("dotenv").config();

const express = require("express");
const cors = require("cors");
const app = express();
const axios = require("axios").default;

const { PORT = 3000 } = process.env;

const CACHE = {};
const POKEMON_CACHE = {};
const LOCATION_CACHE = {};
const EVOLUTION_CACHE = {};
const ERROR = {};

app.use(cors());

app.get("/cache", function (req, res) {
    res.json({ data: CACHE });
  });
  app.post("/pokemon/:name", async function (req, res) {
    const { name } = req.params;
    if (CACHE[name]) {
      return res.json({ name, data: JSON.parse(CACHE[name]), isCached: true });
    }
    if (ERROR[name]) {
      return res.json({ name, data: JSON.parse(ERROR[name]), isCached: true });
    }
    const url = `https://pokeapi.co/api/v2/pokemon/${name}`;
    let responseData;
    try {
      const { data } = await axios.get(url);
      responseData = data;
      CACHE[name] = JSON.stringify(data);
    } catch {
      responseData = data;
      ERROR[name] = JSON.stringify({ name, error: "Invalid pokemon." });
    }
    res.json({ name, data: responseData, isCached: false });
  });

  app.get("/encounters/:name", async function (req, res) {
    const name = req.params.name;
    const link = `https://pokeapi.co/api/v2/pokemon/`;
    var contentEncounters = [];
    try {
      const url = link+`${name}`;
      if (LOCATION_CACHE[name]) {
        res.json({data: JSON.parse(LOCATION_CACHE[name]), isCached: true});
      } else {
        let urlLocationResponse = await urlResponse(url);
        const locationAreaEncounters = await urlResponse(urlLocationResponse.location_area_encounters);
        
        for (var i = 0; i < locationAreaEncounters.length; i++) {
          nameEncounter = "Name: "+locationAreaEncounters[i].location_area.name;
          chanceEncounter = "Chance: "+locationAreaEncounters[i].version_details[0].encounter_details[0].chance+"%";
          methodEncounter = "Method: "+locationAreaEncounters[i].version_details[0].encounter_details[0].method.name;
          versionEncounter = "Version: "+locationAreaEncounters[i].version_details[0].version.name;
          contentEncounters.push({name: nameEncounter, chance: chanceEncounter, method: methodEncounter, version: versionEncounter});
        }
      }
      res.json({data: contentEncounters, isCached: false});
      LOCATION_CACHE[name] = JSON.stringify(contentEncounters);
    } catch {
      res.json({data: 'Invalid Pokemon'});
    }
  });

  app.get("/evolution/:name", async function (req, res) {
    const name = req.params.name;
    var chainEvolution = [];
    var arrayEvolves = [];
    const link = `https://pokeapi.co/api/v2/pokemon/`;
    try {
      const url = link+`${name}`;
      if (EVOLUTION_CACHE[name]) {
        res.json({data: JSON.parse(EVOLUTION_CACHE[name]), isCached: true});
      } else {
        let urlInfoResponse = await urlResponse(url);
        const evolution_chain = await urlResponse(urlInfoResponse.species.url);
        const chain = await urlResponse(evolution_chain.evolution_chain.url);
        let allEvolution = [chain.chain.evolves_to];
        let speciesName = chain.chain.species.name;
        const urlSpeciesName = link+`${speciesName}`;
        let responseInfo = await urlResponse(urlSpeciesName);
        arrayEvolves.push({name: responseInfo.name});
              
        while (allEvolution[0].length !== 0 && allEvolution[0] !== undefined) {
          chainEvolution = allEvolution.shift();
          for (const [i] of chainEvolution.entries()) {
            allEvolution.push(chainEvolution[i].evolves_to);
                let namesEvolution = chainEvolution[i].species.name;
                const evolutionUrl = link+`${namesEvolution}`;
                let responseDataInfo = await urlResponse(evolutionUrl);
                arrayEvolves.push({name: responseDataInfo.name});
              }
            }
          }
          res.json({data: arrayEvolves, isCached: false});
          EVOLUTION_CACHE[name] = JSON.stringify(arrayEvolves);
        } catch {
          res.json({data: 'Invalid Pokemon'});
        }
      });
      async function urlResponse(url) {
        try {
          const { data } = await axios.get(url);
          response = data;
        } catch {
          response = 'Invalid Pokemon';
        }
        return response;
      }
      app.listen(PORT, () => {
      console.log(`Running on port ${PORT}...`);
    });
