const multipipe = require('multipipe');
const { Writable, pipeline } = require('stream');
const PokeAPI = require('../PokeAPIClient');
const awaitStream = require('../streams/awaitStream');
const filterStream = require('../streams/filterStream');

async function* pokemonIterator() {
  yield* await PokeAPI.fetchPokemonList();
}

function pokemonCommand({ types, moves, abilities }) {
  // Add filters
  const filters = [];
  if (types) {
    filters.push(filterStream((pokemon) =>
      types.every(t => pokemon.types.find(({ type }) => type === t))
    ))
  }
  if (moves) {
    filters.push(filterStream((pokemon) =>
      moves.every(m => pokemon.moves.find(({ move }) => move === m))
    ))
  }
  if (abilities) {
    filters.push(filterStream((pokemon) =>
      abilities.every(a => pokemon.abilities.find(({ ability }) => ability === a))
    ))
  }

  pipeline(
    pokemonIterator(),
    awaitStream(PokeAPI.fetchPokemonInfo),
    multipipe(filters),
    new Writable({
      objectMode: true,
      async write(pokemon, _, callback) {
        console.log(pokemon.name, pokemon.types.map(({ type }) => type.name));
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
