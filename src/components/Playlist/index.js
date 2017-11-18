import { h, Component } from 'preact';

import Track from './components/Track';

export default class Playlist extends Component {

  render({ playlist, onSave }, state) {
    return (
      <section id="playlist">
        <header className="playlist-header">
          <div className="playlist-image" style={`background-image: url(${playlist.cover})`}></div>
          <h1 className="playlist-name">{playlist.name}</h1>
        </header>
        <main className="playlist-content">
          <ul className="tracks-list">
            {playlist.tracks.map((track) => <Track track={track} onSave={onSave} />)}
          </ul>
        </main>
      </section>
    );
  }
}
