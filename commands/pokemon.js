const multipipe = require('multipipe');
const { Writable, pipeline } = require('stream');
const PokeAPI = require('../PokeAPIClient');
const awaitStream = require('../streams/awaitStream');
const filterStream = require('../streams/filterStream');

async function* pokemonIterator(verbose) {
  const pokemonList = await PokeAPI.fetchPokemonList();
  if (verbose) {
    console.log('Processing', pokemonList.length, 'pokemons');
  }
  yield* pokemonList;
}

function pokemonCommand({ types, moves, abilities, height, width, verbose }) {
  // Add array filters
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

  // Add expr filters
  if (height) {
    const [op, h] = height;
    const matchesHeight = Function('height', `return height ${op ?? '==='} ${h}`);
    filters.push(filterStream((pokemon) =>
      matchesHeight(pokemon.height)
    ))
  }
  if (width) {
    const [op, w] = width;
    const matchesWidth = Function('width', `return width ${op ?? '==='} ${w}`);
    filters.push(filterStream((pokemon) => 
      matchesWidth(pokemon.width)
    ));
  }

  pipeline(
    pokemonIterator(verbose),
    awaitStream(PokeAPI.fetchPokemonInfo),
    ...filters,
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
