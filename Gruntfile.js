/**
 * Created by ionagamed on 8/12/16.
 */

module.exports = function (grunt) {
    grunt.loadNpmTasks('grunt-webpack');
	grunt.loadNpmTasks('grunt-babel');
    
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
                            include: ['./munchkin','./common'],
                            loader: 'babel-loader',
                            query: {
                                presets: ['es2015']
                            }
                        }
                    ]
                }
            }
		}
    });
	grunt.registerTask('default', ['webpack']);
};
