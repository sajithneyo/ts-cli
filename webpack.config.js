const path = require('path');
const NodeExternals = require('webpack-node-externals');
const NodemonPlugin = require('nodemon-webpack-plugin'); // Ding

module.exports = {
    optimization: {
        minimize: false,
    },
    entry: './src/index.ts',
    externals: [NodeExternals()],
    resolve: {
        extensions: ['.ts', '.js', '.json'],
    },
    devtool: 'inline-source-map',
    target: 'node',
    stats: 'errors-only',
    mode: 'development',
    output: {
        libraryTarget: 'commonjs',
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].js',
    },
    module: {
        rules: [
            {
                test: /\.(js|mjs|ts)$/,
                exclude: /(node_modules)/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        cacheDirectory: true,
                    },
                },
            },
        ],
    },
    plugins: [
        new NodemonPlugin({
            watch: path.resolve('./dist'),
            ignore: ['*.js.map'],
            verbose: false,
            ext: 'js,njk,json',
        }),
    ],
};
