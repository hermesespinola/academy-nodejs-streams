const fetch = require('node-fetch');

const pokeAPIEndpoint = 'https://pokeapi.co/api/v2';

module.exports = {
  async fetchPokemonList(limit = 1118) {
    // Fetch the whole pokemon list (currently 1118)
    let url = `${pokeAPIEndpoint}/pokemon?limit=${limit}`;
    const res = await fetch(url);
    const { results } = await res.json();

    return results;
  },

  async fetchPokemonInfo(pokemon) {
    const res = await fetch(pokemon.url);

    // We'll only keep the fields we are interested in.
    const {
      name, height, weight,
      abilities, types,
    } = await res.json();

    return {
      name, height, weight,
      abilities, types,
    };
  }
}
