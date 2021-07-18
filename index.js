const args = require('./args-parser')();
const commands = require('./commands');

const [commandName] = args._;

commands[commandName](args);
