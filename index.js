const { Writable, Readable } = require('stream');
const argsParser = require('./args-parser');
const PokeAPI = require('./PokeAPIClient');
const getPokemonInfo = require('./streams/getPokemonInfo');

const args = argsParser();

async function* pokemonIterator() {
  yield* await PokeAPI.fetchPokemonList();
}

Readable.from(pokemonIterator(), { objectMode: true })
  .pipe(getPokemonInfo)
  .pipe(new Writable({
    objectMode: true,
    async write(pokemonPromise, _, callback) {
      const pokemonInfo = await pokemonPromise;
      console.log(pokemonInfo.name);
      callback(null);
    }}));
