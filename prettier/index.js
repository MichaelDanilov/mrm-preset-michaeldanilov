const { json, packageJson, install } = require('mrm-core');

function task() {
  const packages = ['prettier'];

  // .prettierrc
  const prettierrc = json('.prettierrc.json');

  prettierrc.set('bracketSpacing', true);
  prettierrc.set('printWidth', 100);
  prettierrc.set('semi', true);
  prettierrc.set('singleQuote', true);
  prettierrc.set('tabWidth', 2);
  prettierrc.set('trailingComma', 'es5');
  prettierrc.set('useTabs', false);

  prettierrc.save();

  const pkg = packageJson();

  pkg
    // Add lint script
    .setScript('prettier', 'prettier --write .')
    .appendScript('lint', 'npm run prettier')
    .save();

  // Dependencies
  install(packages);
}

task.description = 'Adds prettier';
module.exports = task;
