module.exports = (wallaby) => {
  process.env.VUE_CLI_BABEL_TRANSPILE_MODULES = true

  const compiler = wallaby.compilers.babel({ presets: [['@vue/app', { modules: 'commonjs' }]] })

  return {
    files: ['src/**/*', 'jest.config.js', 'package.json', '!src/**/*.spec.js'],

    tests: ['src/**/*.spec.js'],

    env: {
      type: 'node',
      runner: 'node'
    },

    compilers: {
      '**/*.js': compiler,
      '**/*.vue': require('wallaby-vue-compiler')(compiler)
    },

    preprocessors: {
      '**/*.vue': file => require('vue-jest').process(file.content, file.path)
    },

    testFramework: 'jest',

    setup: function (wallaby) {
      const jestConfig = require('./package').jest || require('./jest.config')
      jestConfig.transform = {}
      jestConfig.moduleNameMapper = {
        '^@/(.*)$': wallaby.projectCacheDir + '/src/$1'
      }
      wallaby.testFramework.configure(jestConfig)
    },

    debug: true
  }
}
