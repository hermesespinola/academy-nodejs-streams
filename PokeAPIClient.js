const fetch = require('node-fetch');

const pokeAPIEndpoint = 'https://pokeapi.co/api/v2';

module.exports = {
  async fetchPokemonList() {
    // Fetch the whole pokemon list (currently 1118)
    let url = `${pokeAPIEndpoint}/pokemon?limit=9999`;
    const res = await fetch(url);
    const { results } = await res.json();

    return results;
  },

  async fetchPokemonInfo(pokemon) {
    const res = await fetch(pokemon.url);

    // We'll only keep the fields we are interested in.
    const {
      id, name, height, weight,
      abilities, moves, types,
    } = await res.json();

    return {
      id, name, height, weight,
      abilities, moves, types,
    };
  }
}
