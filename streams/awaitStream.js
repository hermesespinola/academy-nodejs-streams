const { Transform } = require('stream');
const multipipe = require('multipipe');

const awaitStream = (fnPromise) => multipipe(
  new Transform({
    objectMode: true,
    transform(value, _, callback) {
      callback(null, fnPromise(value));
    },
  }),
  new Transform({
    objectMode: true,
    async transform(promise, _, callback) {
      callback(null, await promise);
    },
  }),
);

module.exports = awaitStream;
