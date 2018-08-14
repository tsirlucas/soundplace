import createHashHistory from 'history/createHashHistory';

export const browserHistory = createHashHistory();

export const privateRoutes = [
  {
    path: '/playlists',
    icon: 'PLAYLISTS',
    header: 'Playlists',
  },
  {
    path: '/storage',
    icon: 'STORAGE',
    viewbox: '30',
    header: 'Storage',
  },
];
