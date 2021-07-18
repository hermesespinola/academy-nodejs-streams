const { Writable, Readable } = require('stream');
const PokeAPI = require('./PokeAPIClient');
const getPokemonInfo = require('./streams/getPokemonInfo');
const pokemonFilter = require('./streams/pokemonFilter');

async function* pokemonIterator() {
  yield* await PokeAPI.fetchPokemonList();
}

function pokemonCommand(args) {
  Readable.from(pokemonIterator(), { objectMode: true })
  .pipe(getPokemonInfo())
  .pipe(pokemonFilter(args))
  .pipe(new Writable({
    objectMode: true,
    async write(pokemonPromise, _, callback) {
      const pokemonInfo = await pokemonPromise;
      console.log(pokemonInfo.name);
      callback();
    }}));
}

module.exports = pokemonCommand;
