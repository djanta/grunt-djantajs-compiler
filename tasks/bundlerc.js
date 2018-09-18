/*
 * grunt-djantajs-compiler
 * https://github.com/djantaio/grunt-djantajs-compiler
 *
 * Copyright (c) 2017 team.tools@djanta.io
 * Licensed under the MIT license.
 */

'use strict';

let util = require('util');
let { Compiler } = require('@djanta/djantajs-compiler-core');
let { ModuleBase, Handler } = require('@djanta/djantajs-compiler-rc');
let _ = require ('lodash');

const NAME = 'bundlerc';
const DEFAULT_FILTER = '**/*.js';
const DEFAULT_EXCLUDES = [
  'node_modules/**/*',
  'Grunt*.js',
  'grunt-*/**',
  'test/**/*',
  'tests/**/*',
  'Gulp*.js',
  'gulp-*/**',
  'example*/**/*',
  '**/**/*.spec.js'
];

/**
 * Exporting grunt task handler
 * @param {Grunt} grunt a valid grunt instance
 */
module.exports = function (grunt) {
  /**
   * Registering our compile task
   */
  grunt.registerMultiTask(NAME, 'djantajs Grunt compiler', function () {
    let self = this;
    let rt$0 = new Compiler(_.defaults({
      error: grunt.fail.fatal,
      warn: grunt.fail.warn,
      log: grunt.log.writeln
    }));

    let opts = self.options() || {};

    let handlers = [new Handler(rt$0)];
    let annotations = [{
      pattern: _.isNil(opts.pattern) ? DEFAULT_FILTER : opts.pattern,
      excludes: _.isNil(opts.excludes) ? DEFAULT_EXCLUDES : opts.excludes,
      src: ModuleBase
    }];

    let gruntify = _.defaults({});

    [
      {
        name: 'project',
        required: true,
        properties: {
          src: { type: 'directory', required: true},
          clean: { type: 'boolean', required: false },
          files: { required: false }
        }
      },
      {
        name: 'annotations',
        required: false,
        options: {
          // excludes: self.data.option['excludes'] || DEFAULT_EXCLUDES,
          // pattern: self.data.option['pattern'] || DEFAULT_FILTER,
        }
      },
      {
        name: 'handlers',
        required: false,
        // data: self.data.handlers
      }
    ].forEach((argv) => {
      if (true === argv.required && _.isNil(self.data[argv.name])) {
        grunt.fail.fatal(`${argv.name} option is missing`, -1);
      }
      else {
        if (!_.isNil(argv['properties'])) {
          _.each(argv.properties, (val, property) => {
            if (true === val.required && !self.data[argv.name][property]) {
              grunt.fail.fatal(`The following property: [${property}] 
                is required by: [${argv.name}]`, -1);
            }
            else {
              switch(val.type) {
                case 'directory':
                  if (!grunt.file.isDir(self.data[argv.name][property])) {
                    let msg = util.format('the property: [%s.%s] ' +
                      'with value [%s] must be a directory', argv.name,
                      property, self.data[argv.name][property]);

                    grunt.fail.fatal(msg, -1);
                  }
                break;
                // Skip default
              }
            }
          });
        }
      }
      gruntify[argv.name] = self.data[argv.name];
    });

    // compile the annotation context ...
    rt$0.compile(_.merge({}, gruntify, {
      handlers: handlers,
      annotations: annotations
    }), (err, result) => {
      if (!_.isNull(err)) {
        // grunt.log.ok('Generating done!');
      }
    })
      .then ((result) => grunt.log.ok('Generating done!'))
      .catch((ex) => grunt.fail.fatal(ex));
  });
};
