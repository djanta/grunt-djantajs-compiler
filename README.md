# grunt-djantajs-compiler

[![npm version](https://img.shields.io/npm/v/grunt-djantajs-compiler?style=flat)](https://www.npmjs.com/package/grunt-djantajs-compiler)
[![npm downloads](https://img.shields.io/npm/dm/grunt-djantajs-compiler.svg?style=flat)](https://www.npmjs.com/package/grunt-djantajs-compiler)
[![Travis](https://img.shields.io/travis/djanta/grunt-djantajs-compiler/master.svg?style=flat)](https://travis-ci.org/djanta/grunt-djantajs-compiler)
[![Maintainability](https://api.codeclimate.com/v1/badges/e993001806df976e7459/maintainability)](https://codeclimate.com/github/djanta/grunt-djantajs-compiler/maintainability)
[![Test Coverage](https://api.codeclimate.com/v1/badges/e993001806df976e7459/test_coverage)](https://codeclimate.com/github/djanta/grunt-djantajs-compiler/test_coverage)
[![Gitter](https://img.shields.io/gitter/room/nwjs/nw.js.svg?style=flat)](https://gitter.im/djantajs/djantajs?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge)

> djanta-rc grunt resource compiler

## Getting Started
This plugin requires Grunt `~0.4.5`

If you haven't used [Grunt](http://gruntjs.com/) before, be sure to check out the [Getting Started](http://gruntjs.com/getting-started) guide, as it explains how to create a [Gruntfile](http://gruntjs.com/sample-gruntfile) as well as install and use Grunt plugins. Once you're familiar with that process, you may install this plugin with this command:

```shell
npm i grunt-djantajs-compiler --save-dev[-D]
```

Once the plugin has been installed, it may be enabled inside your Gruntfile with this line of JavaScript:

```js
grunt.loadNpmTasks('grunt-djantajs-compiler');
```

## The "bundlerc" task

### Overview
In your project's Gruntfile, add a section named `bundlerc` to the data object passed into `grunt.initConfig()`.

```js
grunt.initConfig({
  bundlerc: {
    options: {
      // Task-specific options go here.
      pattern: '**/*.js',
      excludes: [
        'node_modules/**/*',
        'Grunt*.js',
        'grunt-*/**',
        'test/**/*',
        'tests/**/*',
        'Gulp*.js',
        'gulp-*/**',
        'example*/**/*',
      ]
    },
    // The specific task name goes here...
    default: {
      project: {
        // Target-specific file lists and/or options go here.
        src: 'Here is the place you define your project root absolute path' // path.resolve(__dirname, 'test', 'project')
      }
    }
  }
});
```
### Options

#### options.pattern
Type: `String`<br/>
**required**: `false`<br/>
Default value: `'**/*.js'`

A string value that is used as a regex to filter all file your script file candidate for introspection.

#### options.excludes
Type: `Array`<br/>
**required**: `false`<br/>
Default value: `[]`

An array value that is used to exclude an unnecessary resource which we do want to introspect for annotation detection purposes.

### Tasks
In your specifi grunt task section, you'll have to define the most important configuration section as follow

#### project.src
Type: `String` <br/>
**required**: `true`<br/>
Default value: ``

A string value or file descriptor that must point to your project root absolute path. This's where the annotation scanning will start at

### Usage Examples

#### Default Options
In this example, the default options are used to do something with whatever. So if the `testing` file has the content `Testing` and the `123` file had the content `1 2 3`, the generated result would be `Testing, 1 2 3.`

```js
grunt.initConfig({
 bundlerc: {
    options: {
      pattern: '**/*.js',
      excludes: [
        'node_modules/**/*',
        'Grunt*.js',
        'grunt-*/**',
        'test/**/*',
        'tests/**/*',
        'Gulp*.js',
        'gulp-*/**',
        'example*/**/*',
      ]
    },
    compile: {
      project: {
        src: path.resolve(__dirname, 'test', 'project')
      }
    }
  }
});
```
## Contributing
In lieu of a formal styleguide, take care to maintain the existing coding style. Add unit tests for any new or changed functionality. Lint and test your code using [Grunt](http://gruntjs.com/).
