/**
 * Created by ionagamed on 8/12/16.
 */

var path = require('path');

module.exports = function (grunt) {
    grunt.loadNpmTasks('grunt-webpack');
    
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        webpack: {
            munchkin: {
                entry: [
                    './munchkin/munchkin.js'
                ],
                output: {
                    publicPath: '/client',
                    filename: 'client/munchkin.js'
                },
                module: {
                    loaders: [
                        {
                            test: /\.js$/,
                            include: './munchkin',
                            loader: 'babel-loader',
                            query: {
                                presets: ['es2016']
                            }
                        }
                    ]
                }
            }
        }
    });

    grunt.registerTask('default', ['webpack']);
};