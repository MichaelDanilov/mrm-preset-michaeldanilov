const { packageJson, install } = require('mrm-core');

function task() {
  const packages = ['husky', 'lint-staged'];

  const pkg = packageJson();

  pkg
    .merge({
      husky: {
        hooks: {
          'pre-commit': 'lint-staged',
        },
      },
      'lint-staged': {
        '*.(j|t)s?(x)': ['eslint', 'prettier --write'],
        '*.md': ['yaspeller'],
      },
    })
    .save();

  install(packages);
}

task.description = 'Adds lint-staged';
module.exports = task;
