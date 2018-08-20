import config from "./webpack/config"
import UglifyJsPlugin from "uglifyjs-webpack-plugin"
import webpack from "webpack"
import path from "path"
import {BundleAnalyzerPlugin} from "webpack-bundle-analyzer";
import MiniCssExtractPlugin from "mini-css-extract-plugin";

export default function (env) {
    let devMode = env === 'local';
    let webPackConf = {
        mode: devMode ? 'development' : 'production',
        entry: [
            path.resolve(__dirname, `${config.srcPath}/js/App.jsx`),
            path.resolve(__dirname, `${config.srcPath}/scss/app.scss`),
        ],
        module: {
            rules: [
                {
                    enforce: 'pre',
                    test: /\.(js|jsx)$/,
                    exclude: /node_modules/,
                    loader: 'eslint-loader',
                    options: {
                        emitWarning: true,
                        emitError: true,
                        //failOnWarning: false,
                        //failOnError: true,
                        useEslintrc: false,
                        configFile: './webpack/eslint_conf.js'
                    }
                }, {
                    test: /\.(js|jsx)$/,
                    exclude: /node_modules/,
                    loader: 'babel-loader',
                    query: {
                        presets: ['es2015', 'react', 'stage-2'],
                        compact: false
                    },
                },
                {
                    test: /\.scss$/,
                    use: [
                        devMode ? 'style-loader' : MiniCssExtractPlugin.loader,
                        'css-loader',
                        'postcss-loader',
                        'sass-loader',
                    ],
                }
            ]
        },
        resolve: {
            extensions: ['.js', '.jsx'],
            modules: [path.resolve(__dirname, `${config.srcPath}/js`), 'node_modules']
        },
        devtool: 'source-map',
        plugins: [
            new webpack.optimize.ModuleConcatenationPlugin(),
            new MiniCssExtractPlugin({
                filename: devMode ? '[name].css' : '[name].[hash].css',
                chunkFilename: devMode ? '[id].css' : '[id].[hash].css',
            })
        ],
        optimization: {
            splitChunks: {
                chunks: 'all',
                minSize: 30000,
                minChunks: 1,
                maxAsyncRequests: 5,
                maxInitialRequests: 3,
                automaticNameDelimiter: '.',
                name: true,
                cacheGroups: {
                    vendors: {
                        minChunks: 2,
                        test: /[\\/]node_modules[\\/]/,
                        priority: -10
                    },
                    default: {
                        minChunks: 2,
                        priority: -20,
                        reuseExistingChunk: true
                    }
                }
            }
        },
        output: {
            filename: '[name].bundle.js',
            chunkFilename: '[chunkhash].bundle.js',
            path: path.resolve(__dirname, `${config.distPath}`),
            publicPath: `/dist`,
        },
    };

    if (config.analyze === 1) {
        webPackConf.plugins.push(
            new BundleAnalyzerPlugin(),
        );
    }

    if (!devMode) {
        webPackConf.plugins.push(
            new UglifyJsPlugin(),
            new MiniCssExtractPlugin({
                filename: '[name].css',
                chunkFilename: '[id].css'
            })
        );
    }

    return webPackConf;
};
