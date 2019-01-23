const { lines } = require('mrm-core');

function task() {
  const add = [
    '.DS_Store',
    'Thumbs.db',
    '.idea/',
    '.vscode/',
    '*.sublime-project',
    '*.sublime-workspace',
    '*.log',
    'node_modules/',
    '.env',
    '.env.*',
  ];

  // .gitignore
  lines('.gitignore')
    .add(add)
    .save();
}

task.description = 'Adds .gitignore';
module.exports = task;
