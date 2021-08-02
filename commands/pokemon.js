const fs = require('fs');
const { pipeline } = require('stream');
const JSONStream = require('JSONStream');
const PokeAPI = require('../PokeAPIClient');
const awaitStream = require('../streams/awaitStream');
const filterStream = require('../streams/filterStream');
const logStream = require('../streams/logStream');

function pokemonCommand({ types, abilities, height, weight, limit, verbose }) {
  const filters = makeFilters(types, abilities, height, weight);

  pipeline(
    fs.createReadStream(`${__dirname}/pokemonList`),
    JSONStream.parse('results.*.url'),
    awaitStream(PokeAPI.fetchPokemonInfo),
    ...filters,
    logStream(),
    (error) => {
      if (error) {
        console.error(error.message);
        process.exit(1);
      }
    }
  )
}

function makeFilters(types, abilities, height, weight) {
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

  return filters;
}

module.exports = pokemonCommand;
