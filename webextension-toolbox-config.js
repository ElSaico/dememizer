const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
    webpack: (config, { dev, vendor }) => {
        config.plugins.push(new MiniCssExtractPlugin({
            filename: dev ? '[name].css' : '[name].[hash].css',
            chunkFilename: dev ? '[id].css' : '[id].[hash].css'
        }));
        config.module.rules.push({
            test: /\.scss$/,
            loader: [
                dev ? 'style-loader' : MiniCssExtractPlugin.loader,
                'css-loader',
                {
                    loader: 'sass-loader',
                    options: {
                        sourceMap: dev
                    }
                }
            ]
        });
        config.resolve.extensions.push('.scss');
        return config;
    }
};