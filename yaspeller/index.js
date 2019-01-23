const { json, packageJson, install } = require('mrm-core');

function task() {
  const packages = ['yaspeller'];

  // .yaspellerrc
  const yaspellerrc = json('.yaspellerrc');
  yaspellerrc.set('lang', 'en');
  yaspellerrc.set('ignoreCapitalization', true);
  yaspellerrc.set('dictionary', ['danilov']);

  yaspellerrc.save();

  const pkg = packageJson();

  pkg
    // Add spellcheck
    .setScript('spellcheck', './node_modules/.bin/yaspeller *.md')
    .appendScript('lint', 'npm run spellcheck')
    .save();

  // Dependencies
  install(packages);
}

task.description = 'Adds Yaspeller';
module.exports = task;
