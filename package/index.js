const path = require('path');
const { json } = require('mrm-core');

function task(config) {
  const {
    name,
    email,
    url,
    github,
  } = config.require('name', 'email', 'url', 'github').values();

  const packageName = path.basename(process.cwd());
  const repository = `${github}/${packageName}`;

  const pkgJson = {
    name: packageName,
    version: '1.0.0',
    description: '',
    author: {
      name,
      email,
      url,
    },
    homepage: `https://github.com/${repository}`,
    license: 'MIT',
    keywords: [],
    engines: {
      node: '>=10',
    },
    main: 'index.js',
    scripts: {
      test: 'echo "Error: no test specified" && exit 1',
    },
    dependencies: {},
    devDependencies: {},
  };

  // Create package.json
  const pkg = json('package.json', pkgJson);

  // Update
  if (pkg.exists()) {
    pkg.merge({
      engines: pkgJson.engines,
      scripts: pkgJson.scripts,
    });
  }

  pkg.save();
}

task.description = 'Adds package.json';
module.exports = task;
