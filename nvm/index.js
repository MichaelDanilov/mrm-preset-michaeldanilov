const { lines } = require('mrm-core');

function task() {
  lines('.nvmrc').set(['12']).save();
}

task.description = 'Adds Nvmrc';
module.exports = task;
