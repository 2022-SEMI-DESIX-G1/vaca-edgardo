const { Router } = require('express');
const { getPokemon } = require('../controllers/pokemon');

const routes = Router();

routes.post('/:name', getPokemon);

module.exports = routes;