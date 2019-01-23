const { json, packageJson, install } = require('mrm-core');

function task() {
  const packages = [
    'eslint',
    'eslint-config-airbnb-base',
    'eslint-import-resolver-node',
    'eslint-plugin-import',
  ];

  // .eslintrc
  const eslintrc = json('.eslintrc');
  eslintrc.set('extends', 'airbnb-base');
  eslintrc.set('globals', {});
  eslintrc.set('settings', {
    'import/resolver': {
      node: {
        paths: ['./'],
      },
    },
  });

  eslintrc.save();

  const pkg = packageJson();

  pkg
    // Add lint script
    .setScript('lint:js', './node_modules/.bin/eslint --ext .js app')
    .appendScript('lint', 'npm run lint:js')
    .save();

  // Dependencies
  install(packages);
}

task.description = 'Adds ESLint';
module.exports = task;
