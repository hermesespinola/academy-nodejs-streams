const Yargs = require('yargs/yargs');
const { hideBin } = require('yargs/helpers');

module.exports = () => Yargs(hideBin(process.argv))
  .command('pokemon', 'Search Pokemon that match the given filters', (yargs) =>
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
        alias: 't',
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
      .middleware((argv) => {
        const boolRegex = /^(<|>|<=|>=|===?)?\s*(\d+)$/;
        if (argv.height) {
          const match = argv.height.match(boolRegex);
          if (!match) {
            console.error('Invalid argument: height');
            process.exit(1);
          } else {
            argv.height = [match[1], Number.parseInt(match[2])];
          }
        }
        if (argv.weight) {
          const match = argv.weight.match(boolRegex);
          if (!match) {
            console.error('Invalid argument: weight');
            process.exit(1);
          }
          argv.weight = [match[1], Number.parseInt(match[2])];
        }
      })
  )
  .option('verbose', {
    alias: 'v',
    type: 'boolean',
    description: 'Run with verbose logging',
  })
  .demandCommand(1)
  .strict()
  .argv;
