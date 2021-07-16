const Yargs = require('yargs/yargs');
const { hideBin } = require('yargs/helpers');

module.exports = () => Yargs(hideBin(process.argv))
  .command('pokemon [filters]', 'Search Pokemon that match the given filters', (yargs) =>
    yargs
      .option('abilities', {
        alias: 'a',
        type: 'array',
        description: 'A list of ability names',
      })
      .option('moves', {
        alias: 'm',
        type: 'array',
        description: 'A list of move names',
      })
      .option('types', {
        alias: "t",
        type: 'array',
        description: 'A list of pokemon types (usually pokemon have 1 type, sometimes 2, and very rarelly 3 types)',
      })
      .option('height', {
        alias: 'h',
        type: 'string',
        description: 'A boolean expression to query pokemon height',
      })
      .option('weight', {
        alias: 'h',
        type: 'string',
        description: 'A boolean expression to query pokemon weight',
      })
  )
  .option('verbose', {
    alias: 'v',
    type: 'boolean',
    description: 'Run with verbose logging',
  })
  .demandCommand(1)
  .argv;
