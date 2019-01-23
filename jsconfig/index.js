const { json } = require('mrm-core');

function task() {
  // jsconfig.json
  const jsconfig = json('jsconfig.json');
  jsconfig.set('compilerOptions', {
    allowSyntheticDefaultImports: false,
    baseUrl: '.',
    module: 'commonjs',
    paths: {
      'app/*': ['app/*'],
    },
  });
  jsconfig.set('exclude', ['node_modules']);

  jsconfig.save();
}

task.description = 'Adds Jsconfig';
module.exports = task;
