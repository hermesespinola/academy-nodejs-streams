const fetch = require('node-fetch');

const pokeAPIEndpoint = 'https://pokeapi.co/api/v2';

module.exports = {
  async fetchPokemonList() {
    // Fetch the whole pokemon list (currently 1118)
    let url = `${pokeAPIEndpoint}/pokemon?limit=1000`;
    const res = await fetch(url);
    const { results } = await res.json();

    // const outputStream = new Readable({
    //   objectMode: true,
    //   async read(size) {
    //     if (buffer.length < size) {
    //       const res = await fetch(url);
    //       const { next, results } = await res.json();
    //       buffer.push(...results);

    //       url = next;
    //     }

    //     for (let i = 0; i < size.length || buffer.length > 0; i++) {
    //       this.push(buffer.shift());
    //     }

    //     // End our stream with a null push.
    //     if (!url) {
    //       this.push(null);
    //     }
    //   }
    // });

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
