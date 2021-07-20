const { Transform } = require('stream');

const pokemonFilter = (predicate) => new Transform({
  objectMode: true,
  transform(value, _, callback) {
    if (predicate(value)) {
      callback(null, value);
    } else {
      callback();
    }
  },
});

module.exports = pokemonFilter;
