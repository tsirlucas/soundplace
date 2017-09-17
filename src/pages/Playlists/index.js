import { h, Component } from 'preact';
import { connect } from 'preact-redux';

import Card from './components/PlaylistCard';
import { getPlaylists } from '../../core/playlists/playlists.actions';

@connect(({playlists}) => ({ playlists }))
export default class PlaylistPage extends Component {

  componentDidMount() {
    const { store } = this.context;
    store.dispatch(getPlaylists());
  }

  render(props, state) {
    return (
      <section id="playlists">
        {props.playlists.map((playlist) => <Card item={playlist}/>)}
      </section>
    );
  }
}
