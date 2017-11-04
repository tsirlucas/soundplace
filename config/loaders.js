import path from 'path';

export const loaders = [
  {
    enforce: 'pre',
    test: /\.js$/,
    loader: 'source-map-loader',
    exclude: /src/
  }, {
    enforce: 'pre',
    test: /\.js$/,
    loader: 'eslint-loader',
    include: /src/
  }, {
    test: /\.(ttf|eot|svg|png|jpg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
    loader: "file-loader"
  }, {
    test: /\.js$/,
    loader: 'babel-loader',
    options: {
      "babelrc": false,
      "presets": [
        ["es2015", {
          "modules": false
        }], "stage-0"
      ],
      "plugins": [
        ["transform-export-extensions"],
        ["transform-decorators-legacy"],
        ["transform-react-jsx", { "pragma": "h" }]
      ]
    },
    include: [path.resolve('src'), path.resolve('node_modules/preact-compat/src')]
  }
];
