/**
 * Created by ionagamed on 8/12/16.
 */

module.exports = {
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
};