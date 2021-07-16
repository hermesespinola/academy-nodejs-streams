const argsParser = require('./args-parser');
const PokeAPI = require('./PokeAPIClient');

const args = argsParser();

// Write code here!
PokeAPI.fetchAllPokemon();
