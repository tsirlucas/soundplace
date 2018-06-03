import path from 'path';

export const loaders = [
  {
    enforce: 'pre',
    test: /\.js$/,
    loader: 'source-map-loader',
    exclude: /src/,
  },
  {
    test: /\.(ttf|eot|svg|png|jpg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
    loader: 'file-loader',
  },
  {
    test: /\.tsx?$/,
    loaders: ['awesome-typescript-loader'],
    exclude: /node_modules/,
  },
  {
    test: /\.jsx?$/,
    loader: 'babel-loader',
    options: {
      babelrc: false,
      sourceMaps: true,
      presets: [
        [
          'env',
          {
            modules: false,
          },
        ],
        'stage-0',
      ],
      plugins: [
        ['transform-export-extensions'],
        ['transform-decorators-legacy'],
        ['transform-react-jsx', {pragma: 'h'}],
      ],
    },
    include: [path.resolve('src'), path.resolve('node_modules/preact-compat/src')],
  },
];
