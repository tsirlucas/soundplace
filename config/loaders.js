import path from 'path';

export const loaders = [
  {
    test: /\.tsx?$/,
    use: [
      {
        loader: 'babel-loader',
        options: {
          babelrc: false,
          sourceMaps: true,
          plugins: [['transform-react-jsx', {pragma: 'h'}], 'react-hot-loader/babel'],
        },
      },
      'awesome-typescript-loader',
    ],
    include: [path.resolve('src'), path.resolve('node_modules/preact-compat/src')],
  },
];
