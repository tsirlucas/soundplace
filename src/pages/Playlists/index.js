import { h, Component } from 'preact';

import Card from './components/PlaylistCard';

const mockedPlaylists = [
  {
    name: 'The Mob',
    cover: 'kfldksjflksjafd',
    id: 123
  },
  {
    name: 'Rap Vaviá',
    cover: 'kfldksjflksjafd',
    id: 123
  },
  {
    name: 'Trap Nation',
    cover: 'kfldksjflksjafd',
    id: 123
  },
  {
    name: '90s Alternative Rock',
    cover: 'kfldksjflksjafd',
    id: 123
  },
  {
    name: 'Musicas de bad pra chorar pensando no ex',
    cover: 'kfldksjflksjafd',
    id: 123
  }
];

export default class PlaylistPage extends Component {

  render(props, state) {
    return (
      <section id="playlists">
        {mockedPlaylists.map((playlist) => <Card item={playlist}/>)}
      </section>
    );
  }
}
