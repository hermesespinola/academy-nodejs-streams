const { Transform } = require('stream');

const pokemonFilter = ({ moves, abilities, types }) => new Transform({
  objectMode: true,
  transform(pokemon, _, callback) {
    const matchesTypes = types.every(
      (type) => pokemon.types.some((pokemonType) => pokemonType.type.name === type),
    );

    if (matchesTypes) {
      callback(null, pokemon);
    } else {
      callback();
    }
  },
});

module.exports = pokemonFilter;
