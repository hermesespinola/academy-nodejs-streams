const fetch = require('node-fetch');

const pokeAPIEndpoint = 'https://pokeapi.co/api/v2';

module.exports = {
  async fetchPokemonList(limit = 1118) {
    let url = `${pokeAPIEndpoint}/pokemon?limit=${limit}`;
    const res = await fetch(url);
    const { results } = await res.json();

    return results;
  },

  async fetchPokemonListByAbility(ability) {
    let url = `${pokeAPIEndpoint}/ability/${ability}`;
    const res = await fetch(url);
    const { pokemon } = await res.json();

    return pokemon.map(({ pokemon }) => pokemon);
  },

  async fetchPokemonListByType(type) {
    let url = `${pokeAPIEndpoint}/type/${type}`;
    const res = await fetch(url);
    const { pokemon } = await res.json();

    return pokemon.map(({ pokemon }) => pokemon);
  },

  async fetchPokemonInfo(pokemon) {
    const res = await fetch(pokemon.url);

    // We'll only keep the fields we are interested in.
    const {
      name, height, weight,
      abilities, types,
    } = await res.json();

    const simplifiedAbilities = abilities.map(({ ability }) => ability.name);
    const simplifiedTypes = types.map(({ type }) => type.name);

    return {
      name, height, weight,
      abilities: simplifiedAbilities,
      types: simplifiedTypes,
    };
  }
}
