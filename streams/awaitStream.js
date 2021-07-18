const { Transform } = require('stream');

const awaitStream = () => new Transform({
  objectMode: true,
  async transform(promise, _, callback) {
    callback(null, await promise);
  },
});

module.exports = awaitStream;
