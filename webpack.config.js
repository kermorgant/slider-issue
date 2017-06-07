const path = require('path');

const webpack = require("webpack");
const merge = require('webpack-merge');
const glob = require('glob');

const parts = require('./webpack.parts');

var fs = require('fs');
var includePaths = [
    "node_modules",
    fs.realpathSync(__dirname + '/'),
];

const PATHS = {
    build: path.join(__dirname, 'web/assets'),
    img: path.join(__dirname, '_assets/img'),
    sfweb: path.join(__dirname, 'web'),
};

const commonConfig = merge([
    {
        entry: {
            app: [__dirname+'/_assets/js/app.js'],
            homepage: __dirname+'/_assets/js/homepage.js',
            login: __dirname+'/_assets/js/login.js',
        },
        output: {
            path:PATHS.build,
            filename: '[name].js',
        },
        resolve: {
            unsafeCache: true,
            modules: includePaths,
            alias: {
                jquery: 'jquery/src/jquery.js',
                vue: 'vue/dist/vue.js'
            }
        },
        plugins: [
            new webpack.ProvidePlugin({
                $: "jquery",
                jQuery: "jquery",
                "window.jQuery": "jquery"
            })
        ],
    },

    parts.loadJavaScript({
        include: includePaths,
        exclude: /node_modules/
    }),

    parts.loadFonts({
       include: includePaths,
        options: {
            name: 'fonts/[name].[ext]',
        },
    }),

    //parts.loadHtml(),

    parts.copy({
        context: __dirname,
        files: [
            {
                from: '_assets/img', to: 'images',
                flatten: false,
            },
        ],
    }),
]);

const productionConfig = merge([
    parts.clean(PATHS.build),

    parts.minifyCSS({
        options: {
            discardComments: {
                removeAll: true,
            },
            // Run cssnano in safe mode to avoid
            // potentially unsafe transformations.
            safe: true,
        },
    }),

    parts.extractCSS({ use: ["css-loader", parts.autoprefix(), "resolve-url-loader"] }),

    parts.extractLESS({ use: ["css-loader", parts.autoprefix(), "resolve-url-loader", "less-loader?sourceMap"] }),

    parts.imageWebpackLoader({
        options: {
            include: PATHS.img,
            limit: 15000,
            name: 'images/[name].[ext]',
        },
    }),

    parts.minifyJavaScript({ useSourceMap: true }),

    parts.generateSourceMaps({ type: 'source-map' }),

    {
        output: {
            //publicPath: "https://domain/assets"
        },
    },

    parts.imageMin(),

    parts.extractBundles([
        {
            name: 'vendor',
            minChunks: ({ resource }) => (
                resource &&
                    resource.indexOf('node_modules') >= 0 &&
                    resource.match(/\.js$/)
            ),

        },
    ]),

    parts.vue(true),

    //parts.productionBuild(),

]);

const developmentConfig = merge([
    parts.devServer({
        // Customize host/port here if needed
        host: '127.0.0.1',
        port: '8080',
        contentBase: PATHS.sfweb,
    }),

    parts.hmr(),

    parts.loadImages({
        options: {
            include: PATHS.img,
            name: 'images/[name].[ext]',
        },
    }),

    {
        output: {
            devtoolModuleFilenameTemplate: 'webpack:///[absolute-resource-path]',
            publicPath: "/assets/"
        },
    },
    parts.generateSourceMaps({ type: 'cheap-module-source-map' }),

    parts.loadCSS(),

    parts.loadLESS(),

    parts.vue(false),
]);



module.exports = (env) => {
    if (env === 'production') {
        return merge(commonConfig, productionConfig);
    }

    return merge(commonConfig, developmentConfig);
};
