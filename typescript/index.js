const path = require('path');
const { json, makeDirs, template, packageJson, install } = require('mrm-core');

function task() {
  const packages = ['typescript'];

  // tsconfig.json
  const tsconfig = json('tsconfig.json');

  tsconfig.set('compilerOptions', {
    rootDir: '.',
    outDir: './dist',
    strict: true,
    declaration: true,
    module: 'commonjs',
    target: 'esnext',
    esModuleInterop: true,
    moduleResolution: 'node',
    resolveJsonModule: true,
    jsx: 'react',
  });
  tsconfig.set('exclude', ['dist']);
  tsconfig.save();

  makeDirs('src');

  template('src/index.ts', path.join(__dirname, 'index.ts.template')).apply().save();

  const pkg = packageJson();

  pkg
    // Add scripts
    .setScript('build', 'tsc --project .')
    .setScript('prepublishOnly', 'npm run build')
    .set('types', 'dist/index.d.ts')
    .save();

  // Dependencies
  install(packages);
}

task.description = 'Adds TypeScript';
module.exports = task;
