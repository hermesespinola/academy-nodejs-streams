const args = require('./args-parser')();
const commands = require('./commands');

console.log(args);
const [commandName] = args._;

commands[commandName](args);
