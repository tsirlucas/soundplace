import {h, Component} from 'preact';
import {connect} from 'preact-redux';
import {bindActionCreators} from 'redux';

import CardList from '../../components/CardList';
import {lazyLoadImages} from '../../util/intersectionObserver';
import {getArtists} from '../../core/artists/artists.actions';

function mapStateToProps({artists}) {
  return {artists};
}

function mapDispatchToProps(dispatch) {
  return {actions: bindActionCreators({getArtists}, dispatch)};
}

@connect(mapStateToProps, mapDispatchToProps)
export default class ArtistsPage extends Component {
  componentDidMount() {
    this.props.actions.getArtists();
  }

  componentDidUpdate() {
    lazyLoadImages();
  }

  render({artists}, state) {
    return <CardList items={artists} />;
  }
}
