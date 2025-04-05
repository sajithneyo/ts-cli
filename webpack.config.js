const path = require('path');
const NodeExternals = require('webpack-node-externals');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
const NodemonPlugin = require('nodemon-webpack-plugin'); // Ding

module.exports = {
    optimization: {
        minimize: false
    },
    entry: './src/index.ts',
    externals: [NodeExternals()],
    resolve: {
        extensions: ['.ts', '.js', '.json']
    },
    devtool: 'inline-source-map',
    target: 'node',
    stats: 'errors-only',
    mode: 'development',
    output: {
        libraryTarget: 'commonjs',
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].js'
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
                        presets: [
                            [
                                '@babel/preset-env',
                                {
                                    targets: {
                                        node: 'current'
                                    }
                                }
                            ],
                            [
                                '@babel/preset-typescript',
                                {
                                    onlyRemoveTypeImports: true // this is important for proper files watching
                                }
                            ]
                        ],
                        plugins: ['@babel/plugin-proposal-class-properties', '@babel/proposal-object-rest-spread']
                    }
                }
            }
        ]
    },
    plugins: [
        new ForkTsCheckerWebpackPlugin({
            typescript: {
                configFile: path.resolve(__dirname, 'tsconfig.json'),
                memoryLimit: 2048,
                mode: 'write-references',
                diagnosticsOptions: { syntactic: true, semantic: true, declaration: false, global: false },
                profile: true
            }
        }),
        new NodemonPlugin({
            watch: path.resolve('./dist'),
            ignore: ['*.js.map'],
            verbose: false,
            ext: 'js,njk,json'
        })
    ]
};
