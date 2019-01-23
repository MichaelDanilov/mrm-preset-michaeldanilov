const { lines } = require('mrm-core');

function task() {
  lines('.nvmrc')
    .add('10')
    .save();
}

task.description = 'Adds Nvmrc';
module.exports = task;
