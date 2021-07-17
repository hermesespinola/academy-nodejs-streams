const fetch = require('node-fetch');
const { Readable } = require('stream');

const pokeAPIEndpoint = 'https://pokeapi.co/api/v2';

module.exports = {
  fetchPokemonList() {
    let url = `${pokeAPIEndpoint}/pokemon`;
    const buffer = [];
    const outputStream = new Readable({
      objectMode: true,
      async read(size) {
        if (buffer.length < size) {
          const res = await fetch(url);
          const { next, results } = await res.json();
          buffer.push(...results);

          url = next;
        }

        for (let i = 0; i < size.length || buffer.length > 0; i++) {
          this.push(buffer.shift());
        }

        // End our stream with a null push.
        if (!url) {
          this.push(null);
        }
      }
    });

    return outputStream;
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
