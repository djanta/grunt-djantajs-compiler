# grunt-djantajs-compiler

[![npm version](https://img.shields.io/npm/v/grunt-djantajs-compiler?style=flat-square)](https://www.npmjs.com/package/grunt-djantajs-compiler)
[![npm downloads](https://img.shields.io/npm/dm/grunt-djantajs-compiler.svg?style=flat-square)](https://www.npmjs.com/package/grunt-djantajs-compiler)
[![Travis](https://img.shields.io/travis/djanta/grunt-djantajs-compiler/master.svg?style=flat-square&label=unix)](https://travis-ci.org/djanta/grunt-djantajs-compiler)
[![Maintainability](https://api.codeclimate.com/v1/badges/e993001806df976e7459/maintainability)](https://codeclimate.com/github/djanta/grunt-djantajs-compiler/maintainability)
[![Test Coverage](https://api.codeclimate.com/v1/badges/e993001806df976e7459/test_coverage)](https://codeclimate.com/github/djanta/grunt-djantajs-compiler/test_coverage)
[![Gitter](https://img.shields.io/gitter/room/nwjs/nw.js.svg?style=flat-square)](https://gitter.im/djantaio/djantajs?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge)

> djantajs grunt resource compiler

## Getting Started
This plugin requires Grunt `~0.4.5`

If you haven't used [Grunt](http://gruntjs.com/) before, be sure to check out the [Getting Started](http://gruntjs.com/getting-started) guide, as it explains how to create a [Gruntfile](http://gruntjs.com/sample-gruntfile) as well as install and use Grunt plugins. Once you're familiar with that process, you may install this plugin with this command:

```shell
npm i grunt-djantajs-compiler-core --save-dev
```

Once the plugin has been installed, it may be enabled inside your Gruntfile with this line of JavaScript:

```js
grunt.loadNpmTasks('grunt-djantajs-compiler-core');
```

## The "bundlerc" task

### Overview
In your project's Gruntfile, add a section named `bundlerc` to the data object passed into `grunt.initConfig()`.

```js
grunt.initConfig({
  bundlerc: {
    options: {
      // Task-specific options go here.
    },
    your_target: {
      // Target-specific file lists and/or options go here.
    },
  },
});
```

### Options

#### options.separator
Type: `String`
Default value: `',  '`

A string value that is used to do something with whatever.

#### options.punctuation
Type: `String`
Default value: `'.'`

A string value that is used to do something else with whatever else.

### Usage Examples

#### Default Options
In this example, the default options are used to do something with whatever. So if the `testing` file has the content `Testing` and the `123` file had the content `1 2 3`, the generated result would be `Testing, 1 2 3.`

```js
grunt.initConfig({
  bundlerc: {
    options: {},
    files: {
      'dest/default_options': ['src/testing', 'src/123'],
    },
  },
});
```

#### Custom Options
In this example, custom options are used to do something else with whatever else. So if the `testing` file has the content `Testing` and the `123` file had the content `1 2 3`, the generated result in this case would be `Testing: 1 2 3 !!!`

```js
grunt.initConfig({
  bundlerc: {
    options: {
      separator: ': ',
      punctuation: ' !!!',
    },
    files: {
      'dest/default_options': ['src/testing', 'src/123'],
    },
  },
});
```

## Contributing
In lieu of a formal styleguide, take care to maintain the existing coding style. Add unit tests for any new or changed functionality. Lint and test your code using [Grunt](http://gruntjs.com/).

## Release History
_(Nothing yet)_
