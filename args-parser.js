const Yargs = require('yargs/yargs');
const { hideBin } = require('yargs/helpers');

module.exports = () => Yargs(hideBin(process.argv))
  .command('pokemon [filters]', 'Search Pokemon that match the given filters', (yargs) =>
    yargs
      .option('is-starter', { type: 'boolean' })
      .option('abilities', {
        type: 'array',
        description: 'A list of ability names',
      })
      .option('moves', {
        type: 'array',
        description: 'A list of move names',
      })
      .option('types', {
        type: 'array',
        description: 'A list of pokemon types (usually pokemon have 1 type, sometimes 2, and very rarelly 3 types)',
      })
      .option('height', {
        type: 'string',
        description: 'A boolean expression to query pokemon height',
      })
      .option('speed', {
        type: 'string',
        description: 'A boolean expression to query pokemon speed',
      })
      .option('weight', {
        type: 'string',
        description: 'A boolean expression to query pokemon weight',
      })
      .option('hp', {
        type: 'string',
        description: 'A boolean expression to query pokemon hp',
      })
      .option('attack', {
        type: 'string',
        description: 'A boolean expression to query pokemon attack',
      })
      .option('defense', {
        type: 'string',
        description: 'A boolean expression to query pokemon defense',
      })
      .option('special-attack', {
        type: 'string',
        description: 'A boolean expression to query pokemon special-attack',
      })
      .option('special-defense', {
        type: 'string',
        description: 'A boolean expression to query pokemon special-defense',
      }),
  )
  .option('verbose', {
    alias: 'v',
    type: 'boolean',
    description: 'Run with verbose logging',
  })
  .demandCommand(1)
  .argv;
