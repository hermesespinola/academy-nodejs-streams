const argsParser = require('./args-parser');
const PokeAPI = require('./PokeAPIClient');
const { Transform, Writable } = require('stream');

const args = argsParser();

// Write code here!
const pokemonList = PokeAPI.fetchPokemonList();
const getPokemon = new Transform({
  objectMode: true,
  transform(pokemon, _, callback) {
    const pokemonPromise = PokeAPI.fetchPokemonInfo(pokemon);
    callback(null, pokemonPromise);
  }
});

pokemonList
  .pipe(getPokemon)
  .pipe(new Writable({
    objectMode: true,
    async write(pokemonPromise, _, callback) {
      const pokemonInfo = await pokemonPromise;
      console.log(pokemonInfo.name);
      callback(null);
    }}));
