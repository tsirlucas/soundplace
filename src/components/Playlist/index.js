import { h, Component } from 'preact';

import Track from './components/Track';

export default class Playlist extends Component {

  render({ playlist }, state) {
    return (
      <section id="playlist">
        <header className="playlist-header">
          <div className="playlist-image" style={`background-image: url(${playlist.cover})`}></div>
          <h1 className="playlist-name">{playlist.name}</h1>
        </header>
        <main className="playlist-content">
          <table className="table">
            <thead>
              <tr>
                <th>Nome</th>
                <th>Artista</th>
                <th>Álbum</th>
                <th>Duração</th>
              </tr>
            </thead>
            <tbody>
              {playlist.tracks.map((track) => <Track track={track} />)}
            </tbody>
          </table>
        </main>
      </section>
    );
  }
}
