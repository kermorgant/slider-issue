const PurifyCSSPlugin = require('purifycss-webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const BabiliPlugin = require('babili-webpack-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const cssnano = require('cssnano');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const ImageminPlugin = require('imagemin-webpack-plugin').default;
const imageminMozjpeg = require('imagemin-mozjpeg');
const imageminJpegtran = require('imagemin-jpegtran');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const webpack = require('webpack');

exports.devServer = ({ host, port, contentBase } = {}) => ({
    devServer: {
        historyApiFallback: true,
        stats: 'errors-only',
        host, // Defaults to `localhost`
        port, // Defaults to 8080
        overlay: {
            errors: true,
            warnings: true,
        },
        contentBase: contentBase,
        hotOnly: true,
        headers: {
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Credentials": "true",
            "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, PATCH, OPTIONS",
            "Access-Control-Allow-Headers": "X-Requested-With, content-type, Authorization"
        }
    },
});

exports.hmr = (() => {

    return {
        plugins: [
            new webpack.HotModuleReplacementPlugin(),
        ],
    }

});

exports.extractCSS = ({ include, exclude, use }) => {
  // Output extracted CSS to a file
  const plugin = new ExtractTextPlugin({
    filename: '[name].css',
  });

  return {
    module: {
      rules: [
        {
          test: /\.css$/,
          include,
          exclude,

          use: plugin.extract({
            use,
            fallback: 'style-loader',
          }),
        },
      ],
    },
    plugins: [ plugin ],
  };
};

exports.extractLESS = ({ include, exclude, use }) => {
  // Output extracted CSS to a file
  const plugin = new ExtractTextPlugin({
    filename: '[name].css',
  });

  return {
    module: {
      rules: [
        {
          test: /\.less$/,
          include,
          exclude,

          use: plugin.extract({
            use,
            fallback: 'style-loader',
          }),
        },
      ],
    },
    plugins: [ plugin ],
  };
};

exports.loadCSS = ({ include, exclude } = {}) => ({
    module: {
        rules: [
            {
                test: /\.css$/,
                include,
                exclude,

                use: ['style-loader', 'css-loader', "resolve-url-loader"],
            },
        ],
    },
});

exports.loadLESS = ({ include, exclude } = {}) => ({
    module: {
        rules: [
            {
                test: /\.less$/,
                include,
                exclude,
                use: ['style-loader', 'css-loader', "resolve-url-loader", 'less-loader?sourceMap'],
            },
        ],
    },
});

exports.autoprefix = () => ({
  loader: 'postcss-loader',
  options: {
    plugins: () => ([
      require('autoprefixer'),
    ]),
  },
});



exports.purifyCSS = ({ paths, purifyOptions }) => ({
  plugins: [
      new PurifyCSSPlugin({ paths, purifyOptions }),
  ],
});

exports.minifyCSS = ({ options }) => ({
  plugins: [
    new OptimizeCSSAssetsPlugin({
      cssProcessor: cssnano,
      cssProcessorOptions: options,
      canPrint: false,
    }),
  ],
});


exports.loadImages = ({ include, exclude, options } = {}) => ({
  module: {
    rules: [
      {
        test: /\.(png|jpe?g|gif|ico)$/,
        include,
        exclude,

        use: {
          loader: 'file-loader', // why not file-loader ?
          options,
        },
      },
    ],
  },
});

exports.imageMin = () => {
  // Output extracted CSS to a file
  const plugin = new ImageminPlugin({
     // disable: process.env.NODE_ENV !== 'production', // Disable during development
      // pngquant: {
      //   quality: '95-100'
      // },
      jpegtran: {
          progressive: true,
      },
  });

  return {
    plugins: [ plugin ],
  };
};

exports.imageWebpackLoader  = ({ include, exclude, options }) =>  ({
    module: {
        rules: [
            {
                test: /\.(gif|png|jpe?g)$/i,
                loaders: [
                    {
                        loader: 'file-loader',
                        options,
                    },
                    {
                        loader: 'image-webpack-loader',
                        query: {
                            progressive: true,
                            optimizationLevel: 7,
                            interlaced: false,
                            pngquant: {
                                quality: '65-90',
                                speed: 4
                            }
                        }
                    }
                ]
            }
        ]
    }
});

exports.loadHtml = () => ({
    module: {
        rules: [{
            test: /\.html$/,
            use: [ {
                loader: 'html-loader',
            }]
        }]
    }
});

exports.loadFonts = ({ include, exclude, options } = {}) => ({
    module: {
        rules: [
            {
                // Capture eot, ttf, woff, and
                test: /\.(eot|svg|ttf|woff|woff2)(\?v=\d+\.\d+\.\d+)?$/,
                include,
                exclude,

                use: {
                    loader: 'file-loader',
                    options,
                },
            },
        ],
    },
});


exports.generateSourceMaps = ({ type }) => ({
  devtool: type,
});

exports.loadJavaScript = ({ include, exclude }) => ({
    module: {
        rules: [
            {
                test: /\.js$/,
                include,
                exclude,

                loader: 'babel-loader',
                options: {
                    // Enable caching for improved performance during
                    // development.
                    // It uses default OS directory by default. If you need
                    // something more custom, pass a path to it.
                    // I.e., { cacheDirectory: '<path>' }
                    cacheDirectory: true,
                },
            },
        ],
    },
});

exports.vue = (extractCSS) => ({
    module: {
        // module.rules is the same as module.loaders in 1.x
        rules: [
            {
                test: /\.vue$/,
                loader: 'vue-loader',
                options: {
                    // `loaders` will overwrite the default loaders.
                    // The following cofig will cause all <script> tags without "lang"
                    // attribute to be loaded with coffee-loader
                    loaders: {
                        js: 'babel-loader'
                    },
                    extractCSS: extractCSS,

                    // `preLoaders` are attached before the default loaders.
                    // You can use this to pre-process language blocks - a common use
                    // case would be build-time i18n.
                    // preLoaders: {
                    //   js: '/path/to/custom/loader'
                    // },

                    // `postLoaders` are attached after the default loaders.
                    //
                    // - For `html`, the result returned by the default loader
                    //   will be compiled JavaScript render function code.
                    //
                    // - For `css`, the result will be returned by vue-style-loader
                    //   which isn't particularly useful in most cases. Using a postcss
                    //   plugin will be a better option.
                    postLoaders: {
                        html: 'babel-loader'
                    },

                    // `excludedPreLoaders` should be regex
                    excludedPreLoaders: /(eslint-loader)/
                }
            }
        ]
    }

});

exports.minifyJavaScript = () => ({
  plugins: [
    new BabiliPlugin(),
  ],
});


exports.clean = (path) => ({
  plugins: [
    new CleanWebpackPlugin([path]),
  ],
});

exports.copy = ({ context, files }) => {

    return {
        context,
        plugins: [
            new CopyWebpackPlugin(files),
        ],
    };
};


exports.extractBundles = (bundles) => ({
  plugins: bundles.map((bundle) => (
    new webpack.optimize.CommonsChunkPlugin(bundle)
  )),
});


exports.productionBuild = () => {
    return {
        plugins: [
            new webpack.DefinePlugin({
                'process.env': {
                    'NODE_ENV': '"production"'
                }
            })
        ],
    }
};
