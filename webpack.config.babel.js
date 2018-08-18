import config from "./webpack/config"
import UglifyJsPlugin from "uglifyjs-webpack-plugin"
import webpack from "webpack"
import path from "path"
import {BundleAnalyzerPlugin} from "webpack-bundle-analyzer";
import MiniCssExtractPlugin from "mini-css-extract-plugin";

export default function (env) {
    let webPackConf = {
        mode: env === 'local' ? 'development' : 'production',
        entry: [
            path.resolve(__dirname, `${config.srcPath}/js/App.jsx`),
        ],
        module: {
            rules: [
                {
                    enforce: "pre", //to check source files, not modified by other loaders (like babel-loader)
                    test: /\.(js|jsx)$/,
                    exclude: /node_modules/,
                    loader: "eslint-loader"
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
                    use: ['style-loader', MiniCssExtractPlugin.loader, 'css-loader', 'postcss-loader', 'sass-loader']
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
            publicPath: `/theme/`,
        },
    };

    if (config.analyze === 1) {
        webPackConf.plugins.push(
            new BundleAnalyzerPlugin(),
        );
    }

    if (config.env === 'prod') {
        webPackConf.plugins.push(
            new UglifyJsPlugin(),
            new MiniCssExtractPlugin({
                filename: "[name].css",
                chunkFilename: "[id].css"
            })
        );
    }

    return webPackConf;
};
