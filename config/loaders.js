import path from 'path';

export const loaders = [
  {
    test: /\.tsx?$/,
    use: [
      {
        loader: 'babel-loader',
        options: {
          babelrc: false,
          plugins: [['transform-react-jsx', {pragma: 'h'}], 'react-hot-loader/babel'],
        },
      },
      'awesome-typescript-loader',
    ],
    include: [path.resolve('src')],
  },
];
