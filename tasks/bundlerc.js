/*
 * grunt-djantajs-compiler
 * https://github.com/djantaio/grunt-djantajs-compiler
 *
 * Copyright (c) 2017 team.tools@djanta.io
 * Licensed under the MIT license.
 */

'use strict';

const { Compiler } = require('djantajs-compiler-core');
const { ModuleBase } = require('djantajs-compiler-rc');
const { Handler } = require('djantajs-compiler-rc');

const _ = require ('lodash');

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

module.exports = function (grunt) {

  grunt.registerMultiTask('bundlerc', 'Grunt provided task to build your project and then generate .djanta-rc', function() {
    let self = this, rt$0 = new Compiler({error: grunt.fail.fatal, warn: grunt.fail.warn, log: grunt.log.writeln}), handlers = [new Handler(rt$0)],
      annotations = [{src: ModuleBase, excludes: DEFAULT_EXCLUDES, pattern: DEFAULT_FILTER}], gruntify = {};

    [
      {
        name: 'project',
        required: true,
        properties: {
          src: {
            type: 'directory',
            required: true
          },
          clean: {
            type: 'boolean',
            required: false
          },
          files: {
            required: false
          }
        }
      },
      {
        name: 'annotations',
        required: false,
        options: {
          //excludes: self.data.option['excludes'] || DEFAULT_EXCLUDES,
          //pattern: self.data.option['pattern'] || DEFAULT_FILTER,
        }
      },
      {
        name: 'handlers',
        required: false,
        //data: self.data.handlers
      }
    ].forEach((opt) => {

      if (true === opt.required && !(opt.name in self.data)) {
        grunt.fail.fatal ('['+ opt.name +'] option is missing', -1);
      }
      else {
        if ('properties' in opt) {
          Object.keys(opt.properties).forEach((property) => {
            if (true === opt.properties[property].required && !self.data[opt.name][property]) {
              grunt.fail.fatal ('The following property: ['+ property +'] is required by: ['+opt.name+']', -1);
            }
            else {
              switch (opt.properties[property].type) {
                case 'directory':
                  if (!grunt.file.isDir(self.data[opt.name][property])) {
                    grunt.fail.fatal('the property: [' + opt.name + '.' + property + '] with value ['
                      + self.data[opt.name][property] +'] must be a directory.', -1);
                  }
                break;
              }
            }
          })
        }
      }
      gruntify[opt.name] = self.data[opt.name];
    });

    rt$0.compile(_.merge({}, gruntify, {handlers: handlers, annotations: annotations}), (err, result) => {
      if (!_.isNull(err)) grunt.log.ok('Generating done!');
    })
      .then ((result) => {
        grunt.log.writeln(result);
      })
      .catch((ex) => {
        grunt.fail.fatal(ex);
      });
  });
};
