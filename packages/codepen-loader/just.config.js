// NOTE: this package cannot take @uifabric/build as a dependency because of circular dependency
// So, it will take just-scripts directly.
const { taskPresets, task, series, parallel, tscTask, copyTask } = require('just-scripts');

taskPresets.lib();

task('ts', tscTask({ module: 'commonjs', outDir: './lib' }));

task(
  'copy',
  copyTask(
    [
      '../office-ui-fabric-react/src/utilities/exampleData.ts',
      '../office-ui-fabric-react/src/components/ExtendedPicker/examples/PeopleExampleData.ts',
      '../office-ui-fabric-react/src/common/TestImages.ts'
    ],
    'lib'
  )
);

task('build', series('clean', 'copy', parallel('jest', 'ts')));
