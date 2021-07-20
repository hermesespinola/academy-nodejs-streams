const { Writable } = require('stream');

const logStream = () => new Writable({
objectMode: true,
async write(pokemon, _, callback) {
  console.log(pokemon);
  callback();
}});

module.exports = logStream;
