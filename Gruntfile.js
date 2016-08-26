/**
 * Created by ionagamed on 8/12/16.
 */

module.exports = function (grunt) {
    grunt.loadNpmTasks('grunt-webpack');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    
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
                            include: ['./munchkin','./logic'],
                            loader: 'babel-loader',
                            query: {
                                presets: ['es2015']
                            }
                        }
                    ]
                }
            }
		},
        uglify: {
            options: {
                mangleProperties: true,
                reserveDOMCache: true
            },
            munchkin: {
                files: {
                    'client/munchkin.min.js': ['client/munchkin.js']
                }
            }
        }
    });
	grunt.registerTask('default', ['webpack', 'uglify']);
};
