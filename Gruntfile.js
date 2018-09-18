/*
 * grunt-djantajs-compiler-core
 * https://github.com/djanta.io/djantajs-compiler-core
 *
 * Copyright (c) 2017 team.infinite@djanta.io
 * Licensed under the MIT license.
 */

'use strict';

const path = require ('path');

module.exports = function (grunt) {
  // Project configuration.
  grunt.initConfig({
    jshint: {
      all: [
        'Gruntfile.js',
        'tasks/*.js',
        '<%= nodeunit.tests %>'
      ],
      options: {
        jshintrc: '.jshintrc'
      }
    },

    // Before generating any new files, remove any previously-created files.
    clean: {
      tests: ['tmp']
    },

    // Configuration to be run (and then tested).
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
      default: {
        project: {
          src: path.resolve(__dirname, 'test', 'project'),
          clean: true,
          files: ['.djanta-rc.json']
        }
      }
    },

    // Unit tests.
    nodeunit: {
      tests: ['test/*.spec.js']
    }
  });

  // Actually load this plugin's task(s).
  grunt.loadTasks('tasks');

  // These plugins provide necessary tasks.
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-nodeunit');

  // Whenever the "test" task is run, first clean the "tmp" dir, then run this
  // plugin's task(s), then test the result.
  grunt.registerTask('test', ['clean', 'bundlerc', 'nodeunit']);

  // By default, lint and run all tests.
  grunt.registerTask('default', ['jshint', 'test']);
};
