const { Writable, Readable } = require('stream');
const { pipeline } = require('stream');
const PokeAPI = require('../PokeAPIClient');
const getPokemonInfo = require('../streams/getPokemonInfo');
const awaitStream = require('../streams/awaitStream');
const pokemonFilter = require('../streams/pokemonFilter');

async function* pokemonIterator() {
  yield* await PokeAPI.fetchPokemonList();
}

function pokemonCommand(args) {
  pipeline(
    Readable.from(pokemonIterator(), { objectMode: true }),
    getPokemonInfo(),
    awaitStream(),
    pokemonFilter(args),
    new Writable({
      objectMode: true,
      async write(pokemon, _, callback) {
        console.log(pokemon.name);
        callback();
      }}),
    (error) => {
      if (error) {
        console.error(error.message);
        process.exit(1);
      }
    }
  )
}

module.exports = pokemonCommand;
