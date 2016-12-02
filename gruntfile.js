'use strict';

module.exports = function(grunt) {

    grunt.initConfig({

        karma: {
            options: {
                frameworks: [ 'mocha', 'chai' ],
                client: {
                    mocha: {
                        ui: 'bdd'
                    }
                },
                browsers: [ 'PhantomJS' ],
                singleRun: true,

                preprocessors: {
                    'src/js/**/*.js': [ 'coverage' ]
                },
                reporters: [ 'dots', 'coverage' ],
                coverageReporter: {
                    type: 'text-summary'
                }
            },

            registrar: {
                options: {
                    files: [
                        'node_modules/angular/angular.js',
                        'node_modules/angular-mocks/angular-mocks.js',
                        'src/js/shopular.module.js',
                        'src/js/shop.controller.js',
                        'src/js/storage.service.js',
                        'test/specs/storage.spec.service.js',
                        'test/specs/shop.spec.controller.js'
                    ]
                }
            }
        }

    });

    grunt.loadNpmTasks('grunt-karma');

    grunt.registerTask('default', ['karma']);
};
