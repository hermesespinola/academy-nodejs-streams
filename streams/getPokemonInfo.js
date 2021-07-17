const { Transform } = require('stream');

const getPokemonInfo = new Transform({
  objectMode: true,
  transform(pokemon, _, callback) {
    const pokemonPromise = PokeAPI.fetchPokemonInfo(pokemon);
    callback(null, pokemonPromise);
  }
});

module.exports = getPokemonInfo;
