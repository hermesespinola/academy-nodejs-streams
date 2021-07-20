const multipipe = require('multipipe');
const { Writable, pipeline } = require('stream');
const PokeAPI = require('../PokeAPIClient');
const awaitStream = require('../streams/awaitStream');
const filterStream = require('../streams/filterStream');

async function* pokemonIterator(types, abilities, { limit, verbose }) {
  let pokemonList;
  if (abilities) {
    pokemonList = await PokeAPI.fetchPokemonListByAbility(abilities[0]);
  } else if (types) {
    pokemonList = await PokeAPI.fetchPokemonListByType(types[0]);
  } else {
    pokemonList = await PokeAPI.fetchPokemonList(limit);
  }

  if (verbose) {
    console.log('Processing', pokemonList.length, 'pokemons');
  }
  yield* pokemonList;
}

function pokemonCommand({ types, abilities, height, weight, limit, verbose }) {
  // Add array filters
  const filters = [];
  if (types) {
    filters.push(filterStream((pokemon) =>
      types.every(type => pokemon.types.includes(type))
    ))
  }
  if (abilities) {
    filters.push(filterStream((pokemon) =>
      abilities.every(ability => pokemon.abilities.includes(ability))
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
  if (weight) {
    const [op, w] = weight;
    const matchesWeight = Function('weight', `return weight ${op ?? '==='} ${w}`);
    filters.push(filterStream((pokemon) => 
      matchesWeight(pokemon.weight)
    ));
  }

  pipeline(
    pokemonIterator(types, abilities, { limit, verbose }),
    awaitStream(PokeAPI.fetchPokemonInfo),
    ...filters,
    new Writable({
      objectMode: true,
      async write(pokemon, _, callback) {
        console.log(pokemon);
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
