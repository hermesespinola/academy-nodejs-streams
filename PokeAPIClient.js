const fetch = require('node-fetch');

const pokeAPIEndpoint = 'https://pokeapi.co/api/v2';

module.exports = {
  async fetchAllPokemon() {
    let url = `${pokeAPIEndpoint}/pokemon`;
    do {
      const res = await fetch(url);
      const { next, results } = await res.json();
      url = next;

      // TODO: create Readable pokemon list stream.
      console.log(results);
    } while (pokeAPIEndpoint);
  },

  async fetchPokemon(pokemon) {
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
