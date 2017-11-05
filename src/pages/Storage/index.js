import { h, Component } from 'preact';
import { connect } from 'preact-redux';
import { bindActionCreators } from 'redux';

import { loadStorageStatus, getCachedSongs, deleteMusic } from '../../core/storage/storage.actions';
import Playlist from '../../components/Playlist';

let playlistMock = {
  cover: 'https://pl.scdn.co/images/pl/default/1b19606b5ba531a4fc804e09e651b1f8d765ebe7',
  name: 'BEATZ',
  tracks: [
    {
      name: 'Bitch dont kill my vibe',
      artist: 'Kendrick Lamar',
      album: 'DAMN.',
      duration: '4:32'
    },
    {
      name: 'Bitch dont kill my vibe',
      artist: 'Kendrick Lamar',
      album: 'DAMN.',
      duration: '4:32'
    },
    {
      name: 'Bitch dont kill my vibe',
      artist: 'Kendrick Lamar',
      album: 'DAMN.',
      duration: '4:32'
    },
    {
      name: 'Bitch dont kill my vibe',
      artist: 'Kendrick Lamar',
      album: 'DAMN.',
      duration: '4:32'
    }
  ]
};

function mapStateToProps({ storage }) {
  return { storage };
}

function mapDispatchToProps(dispatch) {
  return { actions: bindActionCreators({ loadStorageStatus, getCachedSongs, deleteMusic }, dispatch) };
}

@connect(mapStateToProps, mapDispatchToProps)
export default class StoragePage extends Component {
  componentDidMount() {
    this.props.actions.loadStorageStatus();
    this.props.actions.getCachedSongs();
  }

  render({ storage, actions }) {
    window.treco = storage;
    return (
      <section>
        <h2>Using {storage.usage} of {storage.quota}. {storage.free} free</h2>
        <h3>App resources: {storage.appResources}</h3>
        <br />
        <h3>Cached songs:</h3>
        <br />
        {storage.cachedSongs.map((item) => {
          return (
            <div onClick={() => actions.deleteMusic(item.request.url)} >
              <span>{item.data.name} - {item.data.artist}: {item.data.size}</span> <br />
            </div>
          );
        })}
      </section>
    );
  }
}
